export interface GithubOwner {
  login: string
  avatar_url: string
  html_url: string
}

export interface GithubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  fork: boolean
  archived: boolean
  updated_at: string
  owner: GithubOwner
}

export type GithubLanguageResponse = Record<string, number>
export type GithubLanguageFilter = 'All' | string
export type RepositorySort = 'updated' | 'stars' | 'name'

export interface LanguageStatistic {
  name: string
  bytes: number
  percentage: number
  repositoryUsage: number
  color: string
}

export interface LanguageAnalytics {
  statistics: LanguageStatistic[]
  analyzedRepositories: number
  usedFallback: boolean
}

export interface GithubStats {
  publicRepositories: number
  languages: number
  totalStars: number
  totalForks: number
}
