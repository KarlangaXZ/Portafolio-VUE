import {
  siBitbucket, siCplusplus, siCss, siDatabricks, siDotnet, siFastapi, siGit,
  siGithub, siGodotengine, siHtml5, siJavascript, siNodedotjs, siOpenjdk,
  siPostman, siPython, siReact, siRust, siSharp, siSqlite, siTypescript,
  siVscodium, siVuedotjs,
} from 'simple-icons'
import type { Technology, TechnologyCategory } from '@/types/technology'

export const technologyCategories: TechnologyCategory[] = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'databases', label: 'Databases' },
  { id: 'cloud-tools', label: 'Cloud & Tools' },
  { id: 'additional', label: 'Additional' },
]

export const technologies: Technology[] = [
  { name: 'Vue.js', icon: siVuedotjs, category: 'frontend', url: 'https://vuejs.org/' },
  { name: 'React', icon: siReact, category: 'frontend', url: 'https://react.dev/' },
  { name: 'JavaScript', icon: siJavascript, category: 'frontend' },
  { name: 'TypeScript', icon: siTypescript, category: 'frontend' },
  { name: 'HTML5', icon: siHtml5, category: 'frontend' },
  { name: 'CSS3', icon: siCss, category: 'frontend' },
  { name: 'C#', icon: siSharp, category: 'backend' },
  { name: '.NET', icon: siDotnet, category: 'backend', url: 'https://dotnet.microsoft.com/' },
  { name: 'Python', icon: siPython, category: 'backend' },
  { name: 'FastAPI', icon: siFastapi, category: 'backend' },
  { name: 'Node.js', icon: siNodedotjs, category: 'backend' },
  { name: 'Java', icon: siOpenjdk, category: 'backend' },
  { name: 'Oracle Database', icon: siDatabricks, category: 'databases' },
  { name: 'PL/SQL', icon: siDatabricks, category: 'databases' },
  { name: 'SQL', icon: siSqlite, category: 'databases' },
  { name: 'Entity Framework Core', icon: siDotnet, category: 'databases' },
  { name: 'Git', icon: siGit, category: 'cloud-tools' },
  { name: 'GitHub', icon: siGithub, category: 'cloud-tools', url: 'https://github.com/KarlangaXZ' },
  { name: 'Bitbucket', icon: siBitbucket, category: 'cloud-tools' },
  { name: 'AWS', icon: siDatabricks, category: 'cloud-tools' },
  { name: 'Visual Studio', icon: siDotnet, category: 'cloud-tools' },
  { name: 'VS Code', icon: siVscodium, category: 'cloud-tools' },
  { name: 'Postman', icon: siPostman, category: 'cloud-tools' },
  { name: 'C++', icon: siCplusplus, category: 'additional' },
  { name: 'Godot', icon: siGodotengine, category: 'additional' },
  { name: 'GDScript', icon: siGodotengine, category: 'additional' },
  { name: 'Rust', icon: siRust, category: 'additional' },
]
