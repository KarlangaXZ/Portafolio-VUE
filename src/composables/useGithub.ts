import { computed, ref } from 'vue'
import { getGithubRepositories, getLanguageAnalytics, GithubApiError } from '@/services/githubService'
import type { GithubRepository, GithubStats, LanguageAnalytics } from '@/types/github'

const repositories = ref<GithubRepository[]>([])
const analytics = ref<LanguageAnalytics | null>(null)
const isLoading = ref(false)
const isAnalyticsLoading = ref(false)
const error = ref<string | null>(null)
const analyticsError = ref<string | null>(null)
const isRateLimited = ref(false)
let controller: AbortController | null = null
let repositoryRequest: Promise<void> | null = null
let analyticsRequest: Promise<void> | null = null

const languages = computed(() => ['All', ...new Set(repositories.value.flatMap((repository) => repository.language ?? []).sort())])
const stats = computed<GithubStats>(() => ({
  publicRepositories: repositories.value.length,
  languages: Math.max(0, languages.value.length - 1),
  totalStars: repositories.value.reduce((sum, repository) => sum + repository.stargazers_count, 0),
  totalForks: repositories.value.reduce((sum, repository) => sum + repository.forks_count, 0),
}))

async function fetchLanguageAnalytics(force = false): Promise<void> {
  if (!repositories.value.length) return
  if (analyticsRequest && !force) return analyticsRequest
  isAnalyticsLoading.value = true
  analyticsError.value = null

  analyticsRequest = (async () => {
    try {
      analytics.value = await getLanguageAnalytics(repositories.value, { signal: controller?.signal, force })
    } catch (caughtError) {
      if (caughtError instanceof DOMException && caughtError.name === 'AbortError') return
      analyticsError.value = 'Detailed language data is temporarily unavailable.'
    } finally {
      isAnalyticsLoading.value = false
      analyticsRequest = null
    }
  })()
  return analyticsRequest
}

async function fetchRepositories(force = false): Promise<void> {
  if (repositoryRequest && !force) return repositoryRequest
  if (repositories.value.length && !force) {
    await fetchLanguageAnalytics()
    return
  }

  controller?.abort()
  controller = new AbortController()
  isLoading.value = true
  error.value = null
  isRateLimited.value = false

  repositoryRequest = (async () => {
    try {
      repositories.value = await getGithubRepositories({ signal: controller?.signal, force })
      await fetchLanguageAnalytics(force)
    } catch (caughtError) {
      if (caughtError instanceof DOMException && caughtError.name === 'AbortError') return
      isRateLimited.value = caughtError instanceof GithubApiError && caughtError.rateLimited
      error.value = 'GitHub is taking a little longer to respond.'
    } finally {
      isLoading.value = false
      repositoryRequest = null
    }
  })()
  return repositoryRequest
}

export function useGithub() {
  return {
    repositories,
    analytics,
    languages,
    stats,
    isLoading,
    isAnalyticsLoading,
    error,
    analyticsError,
    isRateLimited,
    fetchRepositories,
    fetchLanguageAnalytics,
  }
}
