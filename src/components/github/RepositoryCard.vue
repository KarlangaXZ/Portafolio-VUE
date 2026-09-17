<script setup lang="ts">
import { BookOpen, ExternalLink, GitFork, Star } from '@lucide/vue'
import type { GithubRepository } from '@/types/github'

defineProps<{ repository: GithubRepository }>()
const dateFormatter = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' })
</script>

<template>
  <article class="repository-card">
    <header>
      <span class="repository-card__icon"><BookOpen :size="18" :stroke-width="1.7" aria-hidden="true" /></span>
      <a :href="repository.html_url" target="_blank" rel="noopener noreferrer" :aria-label="`Open ${repository.name} repository on GitHub`"><ExternalLink :size="16" aria-hidden="true" /></a>
    </header>
    <h3><a :href="repository.html_url" target="_blank" rel="noopener noreferrer">{{ repository.name }}</a></h3>
    <p v-if="repository.description" class="repository-card__description">{{ repository.description }}</p>
    <div v-if="repository.topics.length" class="repository-card__topics" aria-label="Repository topics">
      <span v-for="topic in repository.topics.slice(0, 3)" :key="topic">{{ topic }}</span>
    </div>
    <footer>
      <span v-if="repository.language" class="repository-card__language"><i></i>{{ repository.language }}</span>
      <span><Star :size="13" aria-label="Stars" />{{ repository.stargazers_count }}</span>
      <span><GitFork :size="13" aria-label="Forks" />{{ repository.forks_count }}</span>
      <time :datetime="repository.updated_at">Updated {{ dateFormatter.format(new Date(repository.updated_at)) }}</time>
    </footer>
  </article>
</template>

<style scoped>
.repository-card { border-bottom: 1px solid var(--color-border); display: flex; flex-direction: column; min-width: 0; padding: 2rem 0; }
header { align-items: center; display: flex; justify-content: space-between; }
.repository-card__icon { color: var(--color-dim); }
header > a { align-items: center; color: var(--color-secondary); display: flex; justify-content: center; min-height: 2.75rem; min-width: 2.75rem; }
header > a:hover, h3 a:hover { color: var(--color-accent); }
h3 { font-size: clamp(1.1rem, 2vw, 1.5rem); font-weight: 500; letter-spacing: -.03em; margin: .5rem 0 0; overflow-wrap: anywhere; }
.repository-card__description { color: var(--color-muted); display: -webkit-box; font-size: .85rem; line-height: 1.8; margin: .9rem 0 0; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
.repository-card__topics { display: flex; flex-wrap: wrap; gap: .6rem 1rem; margin-top: 1rem; }
.repository-card__topics span { color: var(--color-dim); font: .6rem var(--font-mono); overflow-wrap: anywhere; }
footer { align-items: center; color: var(--color-dim); display: flex; flex-wrap: wrap; font: .6rem var(--font-mono); gap: .8rem; margin-top: auto; padding-top: 1.8rem; }
footer span { align-items: center; display: inline-flex; gap: .35rem; }
.repository-card__language i { background: var(--color-accent); border-radius: 50%; height: 5px; width: 5px; }
time { margin-left: auto; }
</style>
