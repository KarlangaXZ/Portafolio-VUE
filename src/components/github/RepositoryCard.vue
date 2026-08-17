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
.repository-card { background: rgba(13,18,28,.76); border: 1px solid var(--color-border); border-radius: .9rem; display: flex; flex-direction: column; min-height: 15rem; padding: 1.25rem; transition: border-color 180ms ease, background 180ms ease, transform 180ms ease; }.repository-card:hover { background: rgba(16,22,33,.9); border-color: rgba(89,255,189,.22); transform: translateY(-3px); }header { align-items: center; display: flex; justify-content: space-between; }.repository-card__icon { align-items: center; background: rgba(89,255,189,.07); border: 1px solid rgba(89,255,189,.12); border-radius: .55rem; color: var(--color-accent); display: flex; height: 2.35rem; justify-content: center; width: 2.35rem; }header > a { color: var(--color-dim); transition: color 160ms ease; }header > a:hover { color: var(--color-accent); }h3 { font-size: 1rem; letter-spacing: -.025em; margin: 1.2rem 0 0; overflow-wrap: anywhere; }h3 a:hover { color: var(--color-accent); }.repository-card__description { color: var(--color-muted); display: -webkit-box; font-size: .73rem; line-height: 1.6; margin: .65rem 0 0; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }.repository-card__topics { display: flex; flex-wrap: wrap; gap: .35rem; margin-top: 1rem; }.repository-card__topics span { background: rgba(255,255,255,.025); border: 1px solid var(--color-border); border-radius: 999px; color: var(--color-dim); font-family: var(--font-mono); font-size: .62rem; padding: .3rem .48rem; }footer { align-items: center; border-top: 1px solid var(--color-border); color: var(--color-dim); display: flex; flex-wrap: wrap; font-family: var(--font-mono); font-size: .62rem; gap: .75rem; margin-top: auto; padding-top: 1rem; }footer span { align-items: center; display: inline-flex; gap: .28rem; }.repository-card__language i { background: var(--color-accent); border-radius: 50%; box-shadow: 0 0 8px rgba(89,255,189,.35); height: 6px; width: 6px; }time { margin-left: auto; }
@media (prefers-reduced-motion: reduce) { .repository-card:hover { transform: none; } }
</style>
