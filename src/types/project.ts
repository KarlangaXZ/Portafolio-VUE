export interface Project {
  title: string
  slug: string
  description: string
  longDescription?: string
  technologies: string[]
  highlights: string[]
  githubUrl: string
  demoUrl?: string
  image?: string
  category: string
  featured: boolean
}
