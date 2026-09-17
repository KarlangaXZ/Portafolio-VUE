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
        <SectionHeading number="06" eyebrow="Open source & experiments" title="Inside the repository." description="Projects, experiments and applications I've built while exploring different technologies and solving real problems." />
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
.github-projects__heading { align-items: end; display: flex; gap: 2rem; justify-content: space-between; }
.live-indicator { align-items: center; color: var(--color-muted); display: flex; flex-shrink: 0; font: .6rem var(--font-mono); gap: .6rem; letter-spacing: .06em; padding-bottom: .5rem; text-transform: uppercase; }
.live-indicator i { background: var(--color-accent); border-radius: 50%; height: 5px; width: 5px; }
.repository-toolbar { align-items: end; border-bottom: 1px solid var(--color-border); display: grid; gap: 1.5rem; grid-template-columns: minmax(0, 1fr) 12rem 13rem; margin-top: 4rem; padding-bottom: 2rem; }
.search-field { align-items: center; border-bottom: 1px solid var(--color-border-strong); color: var(--color-dim); display: flex; gap: .8rem; min-height: 3rem; }
.search-field:focus-within { border-color: var(--color-accent); }
.search-field input { background: transparent; border: 0; color: var(--color-text); font: .9rem var(--font-sans); min-width: 0; padding: .8rem 0; width: 100%; }
.search-field input::placeholder { color: var(--color-muted); }
.select-field { display: grid; gap: .7rem; }
.select-field > span { color: var(--color-dim); font: .6rem var(--font-mono); letter-spacing: .08em; text-transform: uppercase; }
.select-field select { background: var(--color-bg); border: 0; border-bottom: 1px solid var(--color-border-strong); border-radius: 0; color: var(--color-secondary); font: .8rem var(--font-sans); min-height: 3rem; padding: .5rem 1rem .5rem 0; width: 100%; }
.repository-grid { display: grid; column-gap: 3rem; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.state-card { align-items: center; border-bottom: 1px solid var(--color-border); display: flex; flex-direction: column; gap: 1rem; justify-content: center; min-height: 20rem; padding: 3rem 1rem; text-align: center; }
.state-card > svg { color: var(--color-dim); }
.state-card h3 { font-size: 1.3rem; font-weight: 500; margin: 0; }
.state-card p { color: var(--color-muted); font-size: .9rem; line-height: 1.7; margin: 0; }
.state-card div { display: flex; flex-wrap: wrap; gap: .7rem; justify-content: center; }
.state-card button, .state-card a, .load-more { align-items: center; background: transparent; border: 1px solid var(--color-border-strong); border-radius: 999px; color: var(--color-secondary); cursor: pointer; display: inline-flex; font: .75rem var(--font-sans); gap: .5rem; min-height: 3rem; padding: .7rem 1.2rem; }
.state-card button:hover, .state-card a:hover, .load-more:hover { border-color: var(--color-muted); color: var(--color-text); }
.load-more { display: flex; margin: 2.5rem auto 0; }
.github-cta { align-items: center; display: flex; gap: 2rem; justify-content: space-between; margin-top: 3rem; }
.github-cta p { font-size: 1.2rem; font-weight: 500; margin: 0 0 .5rem; }
.github-cta span { color: var(--color-dim); font-size: .8rem; }
.sr-only { clip-path: inset(50%); height: 1px; overflow: hidden; position: absolute; white-space: nowrap; width: 1px; }
@media (max-width: 900px) { .repository-toolbar { grid-template-columns: 1fr 1fr; } .search-field { grid-column: 1/-1; } .github-projects__heading { align-items: start; flex-direction: column; } }
@media (max-width: 600px) { .repository-grid { grid-template-columns: 1fr; } .repository-toolbar { gap: 1.5rem 1rem; } .github-cta { align-items: start; flex-direction: column; } }
@media (max-width: 360px) { .repository-toolbar { grid-template-columns: 1fr; } }
</style>
