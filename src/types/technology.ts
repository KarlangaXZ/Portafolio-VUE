import type { SimpleIcon } from 'simple-icons'

export type TechnologyCategoryId = 'frontend' | 'backend' | 'databases' | 'cloud-tools' | 'additional'
export type TechnologyFilter = 'all' | TechnologyCategoryId

export interface Technology {
  name: string
  icon: SimpleIcon
  category: TechnologyCategoryId
  url?: string
}

export interface TechnologyCategory {
  id: TechnologyFilter
  label: string
}
