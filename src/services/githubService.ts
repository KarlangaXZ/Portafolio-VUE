import { readSessionCache, removeSessionCache, writeSessionCache } from '@/services/githubCache'
import type { GithubLanguageResponse, GithubRepository, LanguageAnalytics, LanguageStatistic } from '@/types/github'

const GITHUB_API_URL = 'https://api.github.com'
const GITHUB_USERNAME = 'KarlangaXZ'
const REPOSITORIES_CACHE_KEY = 'portfolio:github:repositories:v1'
const ANALYTICS_CACHE_KEY = 'portfolio:github:language-analytics:v1'
const ANALYTICS_REPOSITORY_LIMIT = 12
const LANGUAGE_REQUEST_CONCURRENCY = 3

const languageColors: Record<string, string> = {
  TypeScript: '#6f8fd8', JavaScript: '#c9b64b', Vue: '#55b98a', 'C#': '#9a74c5',
  Python: '#5f92bd', HTML: '#d47757', CSS: '#778fca', Java: '#b7795d', C: '#8b96a8',
  'C++': '#6683b5', Rust: '#a87d63', Shell: '#79a779',
}

export class GithubApiError extends Error {
  readonly status: number
  readonly rateLimited: boolean

  constructor(status: number) {
    super(status === 403 || status === 429 ? 'GitHub API rate limit reached.' : `GitHub request failed with status ${status}.`)
    this.name = 'GithubApiError'
    this.status = status
    this.rateLimited = status === 403 || status === 429
  }
}

interface RequestOptions {
  signal?: AbortSignal
  force?: boolean
}

async function githubRequest<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${GITHUB_API_URL}${path}`, {
    headers: { Accept: 'application/vnd.github+json' },
    signal,
  })
  if (!response.ok) throw new GithubApiError(response.status)
  return response.json() as Promise<T>
}

export async function getGithubRepositories(options: RequestOptions = {}): Promise<GithubRepository[]> {
  if (options.force) removeSessionCache(REPOSITORIES_CACHE_KEY)
  const cached = readSessionCache<GithubRepository[]>(REPOSITORIES_CACHE_KEY)
  if (cached) return cached

  const repositories = await githubRequest<GithubRepository[]>(
    `/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=100`,
    options.signal,
  )
  const eligible = repositories
    .filter((repository) => !repository.fork && !repository.archived)
    .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))
  writeSessionCache(REPOSITORIES_CACHE_KEY, eligible)
  return eligible
}

export async function getRepositoryLanguages(repositoryName: string, signal?: AbortSignal): Promise<GithubLanguageResponse> {
  return githubRequest<GithubLanguageResponse>(`/repos/${GITHUB_USERNAME}/${encodeURIComponent(repositoryName)}/languages`, signal)
}

function colorForLanguage(name: string, index: number): string {
  const neutralPalette = ['#7ea895', '#8290ad', '#9b88aa', '#a58e78', '#6f999d']
  return languageColors[name] ?? neutralPalette[index % neutralPalette.length] ?? '#8290ad'
}

function buildByteStatistics(responses: GithubLanguageResponse[]): LanguageStatistic[] {
  const bytes = new Map<string, number>()
  const usage = new Map<string, number>()
  for (const response of responses) {
    for (const [language, value] of Object.entries(response)) {
      bytes.set(language, (bytes.get(language) ?? 0) + value)
      usage.set(language, (usage.get(language) ?? 0) + 1)
    }
  }
  const total = [...bytes.values()].reduce((sum, value) => sum + value, 0)
  return [...bytes.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, value], index) => ({
      name,
      bytes: value,
      percentage: total ? Math.round((value / total) * 1000) / 10 : 0,
      repositoryUsage: usage.get(name) ?? 0,
      color: colorForLanguage(name, index),
    }))
}

function buildPrimaryLanguageFallback(repositories: GithubRepository[]): LanguageStatistic[] {
  const usage = new Map<string, number>()
  for (const repository of repositories) {
    if (repository.language) usage.set(repository.language, (usage.get(repository.language) ?? 0) + 1)
  }
  const total = [...usage.values()].reduce((sum, value) => sum + value, 0)
  return [...usage.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, count], index) => ({
      name,
      bytes: 0,
      percentage: total ? Math.round((count / total) * 1000) / 10 : 0,
      repositoryUsage: count,
      color: colorForLanguage(name, index),
    }))
}

export async function getLanguageAnalytics(repositories: GithubRepository[], options: RequestOptions = {}): Promise<LanguageAnalytics> {
  if (options.force) removeSessionCache(ANALYTICS_CACHE_KEY)
  const cached = readSessionCache<LanguageAnalytics>(ANALYTICS_CACHE_KEY)
  if (cached) return cached

  const selected = [...repositories]
    .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))
    .slice(0, ANALYTICS_REPOSITORY_LIMIT)
  const responses: GithubLanguageResponse[] = []
  let nextIndex = 0
  let requestFailed = false

  async function worker(): Promise<void> {
    while (nextIndex < selected.length && !requestFailed) {
      const repository = selected[nextIndex]
      nextIndex += 1
      if (!repository) continue
      try {
        responses.push(await getRepositoryLanguages(repository.name, options.signal))
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') throw error
        requestFailed = true
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(LANGUAGE_REQUEST_CONCURRENCY, selected.length) }, () => worker()))
  const analytics: LanguageAnalytics = {
    statistics: requestFailed ? buildPrimaryLanguageFallback(selected) : buildByteStatistics(responses),
    analyzedRepositories: selected.length,
    usedFallback: requestFailed,
  }
  writeSessionCache(ANALYTICS_CACHE_KEY, analytics)
  return analytics
}
