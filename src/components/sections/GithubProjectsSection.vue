<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { GitFork, RotateCcw, Search, SlidersHorizontal } from '@lucide/vue'
import RepositoryCard from '@/components/github/RepositoryCard.vue'
import RepositorySkeleton from '@/components/github/RepositorySkeleton.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { useGithub } from '@/composables/useGithub'
import { useScrollReveal } from '@/composables/useScrollReveal'
import type { RepositorySort } from '@/types/github'

const sectionRef = useScrollReveal<HTMLElement>()
void sectionRef
const { repositories, languages, isLoading, error, fetchRepositories } = useGithub()
const searchQuery = ref('')
const selectedLanguage = ref('All')
const selectedSort = ref<RepositorySort>('updated')
const visibleCount = ref(6)

const filteredRepositories = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase()
  const filtered = repositories.value.filter((repository) => {
    const languageMatches = selectedLanguage.value === 'All' || repository.language === selectedLanguage.value
    const searchMatches = !query || repository.name.toLocaleLowerCase().includes(query)
      || repository.description?.toLocaleLowerCase().includes(query)
      || repository.topics.some((topic) => topic.toLocaleLowerCase().includes(query))
    return languageMatches && Boolean(searchMatches)
  })

  return [...filtered].sort((a, b) => {
    if (selectedSort.value === 'stars') return b.stargazers_count - a.stargazers_count
    if (selectedSort.value === 'name') return a.name.localeCompare(b.name)
    return Date.parse(b.updated_at) - Date.parse(a.updated_at)
  })
})

const visibleRepositories = computed(() => filteredRepositories.value.slice(0, visibleCount.value))
const canLoadMore = computed(() => visibleCount.value < filteredRepositories.value.length)
watch([searchQuery, selectedLanguage, selectedSort], () => { visibleCount.value = 6 })

function clearFilters(): void {
  searchQuery.value = ''
  selectedLanguage.value = 'All'
  selectedSort.value = 'updated'
}

onMounted(() => { void fetchRepositories() })
</script>

<template>
  <section id="github" ref="sectionRef" class="github-projects section section--surface scroll-reveal" aria-label="GitHub repositories">
    <div class="container">
      <div class="github-projects__heading">
        <SectionHeading eyebrow="GitHub" title="Explore my repositories" description="Projects, experiments and applications I've built while exploring different technologies and solving real problems." />
        <span class="live-indicator"><i></i>Live GitHub Data</span>
      </div>

      <div class="repository-toolbar" aria-label="Repository filters">
        <label class="search-field"><span class="sr-only">Search repositories</span><Search :size="17" aria-hidden="true" /><input v-model="searchQuery" type="search" placeholder="Search repositories..." autocomplete="off" /></label>
        <label class="select-field"><span>Language</span><select v-model="selectedLanguage" aria-label="Filter by language"><option v-for="language in languages" :key="language" :value="language">{{ language }}</option></select></label>
        <label class="select-field"><span>Sort by</span><select v-model="selectedSort" aria-label="Sort repositories"><option value="updated">Recently Updated</option><option value="stars">Most Stars</option><option value="name">Name</option></select></label>
      </div>

      <div v-if="isLoading && !repositories.length" class="repository-grid" role="status" aria-label="Loading GitHub repositories"><RepositorySkeleton v-for="index in 6" :key="index" /></div>

      <div v-else-if="error && !repositories.length" class="state-card" role="alert">
        <GitFork :size="25" aria-hidden="true" /><h3>GitHub is taking a little longer to respond.</h3><p>The portfolio remains available while the public API recovers.</p>
        <div><button type="button" @click="fetchRepositories(true)"><RotateCcw :size="15" />Try again</button><a href="https://github.com/KarlangaXZ" target="_blank" rel="noopener noreferrer">Visit GitHub Profile</a></div>
      </div>

      <template v-else>
        <div v-if="visibleRepositories.length" class="repository-grid">
          <RepositoryCard v-for="repository in visibleRepositories" :key="repository.id" :repository="repository" />
        </div>
        <div v-else class="state-card state-card--empty">
          <SlidersHorizontal :size="25" aria-hidden="true" /><h3>No repositories match these filters.</h3><button type="button" @click="clearFilters">Clear filters</button>
        </div>
        <button v-if="canLoadMore" class="load-more" type="button" @click="visibleCount += 6">Load more</button>
      </template>

      <div class="github-cta"><div><p>Want to see everything?</p><span>Browse all public repositories directly on GitHub.</span></div><BaseButton href="https://github.com/KarlangaXZ" variant="secondary" external :icon="GitFork">View GitHub Profile</BaseButton></div>
    </div>
  </section>
</template>

<style scoped>
.github-projects__heading { align-items: end; display: flex; gap: 2rem; justify-content: space-between; }.live-indicator { align-items: center; border: 1px solid var(--color-border); border-radius: 999px; color: var(--color-dim); display: flex; flex: 0 0 auto; font-family: var(--font-mono); font-size: .62rem; gap: .5rem; padding: .5rem .7rem; text-transform: uppercase; }.live-indicator i { animation: pulse 2.2s ease-in-out infinite; background: var(--color-accent); border-radius: 50%; box-shadow: 0 0 8px rgba(89,255,189,.5); height: 6px; width: 6px; }.repository-toolbar { align-items: end; background: rgba(10,14,22,.7); border: 1px solid var(--color-border); border-radius: .9rem; display: grid; gap: .75rem; grid-template-columns: minmax(220px,1fr) 12rem 13rem; margin-top: 3rem; padding: .75rem; }.search-field { align-items: center; background: rgba(255,255,255,.025); border: 1px solid var(--color-border); border-radius: .6rem; color: var(--color-dim); display: flex; gap: .65rem; min-height: 2.8rem; padding: 0 .8rem; }.search-field:focus-within { border-color: rgba(89,255,189,.32); }.search-field input { background: transparent; border: 0; color: var(--color-text); font: .75rem var(--font-sans); min-width: 0; outline: 0; width: 100%; }.search-field input::placeholder { color: var(--color-dim); }.select-field { display: grid; gap: .35rem; }.select-field > span { color: var(--color-dim); font-family: var(--font-mono); font-size: .62rem; padding-left: .2rem; text-transform: uppercase; }.select-field select { appearance: none; background: rgba(255,255,255,.025); border: 1px solid var(--color-border); border-radius: .6rem; color: var(--color-secondary); font: .68rem var(--font-sans); min-height: 2.8rem; outline: 0; padding: 0 .8rem; }.select-field select:focus-visible { border-color: var(--color-accent); }.repository-grid { display: grid; gap: .8rem; grid-template-columns: repeat(3,minmax(0,1fr)); margin-top: 1rem; }.state-card { align-items: center; background: rgba(13,18,28,.7); border: 1px solid var(--color-border); border-radius: .9rem; display: flex; flex-direction: column; margin-top: 1rem; min-height: 18rem; justify-content: center; padding: 2rem; text-align: center; }.state-card > svg { color: var(--color-accent); }.state-card h3 { font-size: 1.1rem; margin: 1rem 0 0; }.state-card p { color: var(--color-muted); font-size: .78rem; margin: .55rem 0 0; }.state-card div { display: flex; flex-wrap: wrap; gap: .5rem; justify-content: center; margin-top: 1.2rem; }.state-card button,.state-card a,.load-more { align-items: center; background: rgba(255,255,255,.035); border: 1px solid var(--color-border-strong); border-radius: .6rem; color: var(--color-secondary); cursor: pointer; display: inline-flex; font: 650 .68rem var(--font-sans); gap: .45rem; min-height: 2.6rem; padding: 0 .9rem; }.state-card button:hover,.state-card a:hover,.load-more:hover { border-color: rgba(89,255,189,.3); color: var(--color-text); }.load-more { display: flex; margin: 1.5rem auto 0; }.github-cta { align-items: center; border-top: 1px solid var(--color-border); display: flex; gap: 2rem; justify-content: space-between; margin-top: 3rem; padding-top: 2rem; }.github-cta p { font-size: 1rem; font-weight: 700; margin: 0; }.github-cta span { color: var(--color-dim); font-size: .7rem; }.sr-only { height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; width: 1px; clip: rect(0,0,0,0); }@keyframes pulse { 50% { opacity: .35; } }
@media (max-width: 900px) { .repository-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }.repository-toolbar { grid-template-columns: 1fr 1fr; }.search-field { grid-column: 1/-1; } }
@media (max-width: 600px) { .github-projects__heading,.github-cta { align-items: flex-start; flex-direction: column; }.repository-toolbar,.repository-grid { grid-template-columns: 1fr; }.search-field { grid-column: auto; }.select-field select { width: 100%; } }
@media (prefers-reduced-motion: reduce) { .live-indicator i { animation: none; } }
</style>
