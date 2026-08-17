<script setup lang="ts">
import { computed, onMounted, type Component } from 'vue'
import { Code2, GitFork, Languages, Star } from '@lucide/vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { useGithub } from '@/composables/useGithub'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = useScrollReveal<HTMLElement>()
void sectionRef
const { analytics, stats, isAnalyticsLoading, fetchRepositories } = useGithub()

interface StatCard { label: string; value: number; icon: Component }
const statCards = computed<StatCard[]>(() => [
  { label: 'Public Repositories', value: stats.value.publicRepositories, icon: Code2 },
  { label: 'Languages', value: stats.value.languages, icon: Languages },
  { label: 'Total Stars', value: stats.value.totalStars, icon: Star },
  { label: 'Total Forks', value: stats.value.totalForks, icon: GitFork },
])
const visibleLanguages = computed(() => analytics.value?.statistics.slice(0, 8) ?? [])
onMounted(() => { void fetchRepositories() })
</script>

<template>
  <section id="github-stats" ref="sectionRef" class="github-stats section scroll-reveal" aria-label="GitHub developer statistics">
    <div class="container">
      <SectionHeading eyebrow="Developer statistics" title="Built from live repository data." description="A transparent view of public work and the languages detected across recently updated projects." />

      <div class="stats-grid">
        <article v-for="card in statCards" :key="card.label">
          <component :is="card.icon" :size="20" :stroke-width="1.6" aria-hidden="true" />
          <strong>{{ card.value }}</strong><span>{{ card.label }}</span>
        </article>
      </div>

      <div class="language-dashboard">
        <header><div><p>Language analytics</p><h3>Languages across my projects</h3></div><span v-if="analytics">{{ analytics.analyzedRepositories }} recent repositories analyzed</span></header>

        <div v-if="isAnalyticsLoading && !analytics" class="analytics-loading" role="status" aria-label="Loading language analytics"><span></span><span></span><span></span><span></span></div>
        <template v-else-if="analytics && visibleLanguages.length">
          <div class="language-segments" role="img" :aria-label="`Language distribution across ${analytics.analyzedRepositories} repositories`">
            <i v-for="language in analytics.statistics" :key="language.name" :style="{ width: `${language.percentage}%`, backgroundColor: language.color }" :title="`${language.name}: ${language.percentage}%`"></i>
          </div>
          <div class="language-list">
            <div v-for="language in visibleLanguages" :key="language.name" class="language-row">
              <div class="language-row__label"><i :style="{ backgroundColor: language.color }"></i><strong>{{ language.name }}</strong><span>{{ language.repositoryUsage }} {{ language.repositoryUsage === 1 ? 'repository' : 'repositories' }}</span></div>
              <div class="language-row__bar" aria-hidden="true"><i :style="{ width: `${language.percentage}%`, backgroundColor: language.color }"></i></div>
              <b>{{ language.percentage }}%</b>
            </div>
          </div>
          <p v-if="analytics.usedFallback" class="analytics-note">Detailed language endpoints were unavailable, so this view uses the primary languages returned with each repository.</p>
          <p v-else class="analytics-note">Percentages are calculated from language byte counts reported by GitHub for the most recently updated repositories.</p>
        </template>
        <div v-else class="analytics-empty">Language analytics are temporarily unavailable.</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-grid { display: grid; gap: .8rem; grid-template-columns: repeat(4,minmax(0,1fr)); margin-top: 3.5rem; }.stats-grid article { background: linear-gradient(145deg,rgba(17,23,34,.88),rgba(10,14,22,.72)); border: 1px solid var(--color-border); border-radius: .9rem; min-height: 10rem; padding: 1.25rem; }.stats-grid svg { color: var(--color-accent); }.stats-grid strong { display: block; font-size: clamp(2rem,4vw,3rem); letter-spacing: -.06em; line-height: 1; margin-top: 1.4rem; }.stats-grid span { color: var(--color-dim); display: block; font-family: var(--font-mono); font-size: .62rem; margin-top: .55rem; text-transform: uppercase; }.language-dashboard { background: linear-gradient(145deg,rgba(17,23,34,.9),rgba(9,13,21,.78)); border: 1px solid var(--color-border); border-radius: var(--radius-card); margin-top: 1rem; padding: clamp(1.3rem,4vw,2.5rem); }.language-dashboard > header { align-items: end; display: flex; gap: 2rem; justify-content: space-between; }.language-dashboard header p { color: var(--color-accent); font-family: var(--font-mono); font-size: .64rem; letter-spacing: .08em; margin: 0 0 .55rem; text-transform: uppercase; }.language-dashboard h3 { font-size: clamp(1.3rem,3vw,2rem); letter-spacing: -.04em; margin: 0; }.language-dashboard header > span { color: var(--color-dim); font-family: var(--font-mono); font-size: .62rem; }.language-segments { background: rgba(255,255,255,.03); border-radius: 999px; display: flex; height: .65rem; margin-top: 2rem; overflow: hidden; }.language-segments i { display: block; min-width: 2px; opacity: .85; }.language-list { display: grid; gap: .85rem; margin-top: 2rem; }.language-row { align-items: center; display: grid; gap: 1rem; grid-template-columns: minmax(12rem,.75fr) minmax(10rem,1.25fr) 3.5rem; }.language-row__label { align-items: center; display: flex; min-width: 0; }.language-row__label > i { border-radius: 50%; flex: 0 0 auto; height: 7px; margin-right: .65rem; width: 7px; }.language-row__label strong { font-size: .75rem; }.language-row__label span { color: var(--color-dim); font-family: var(--font-mono); font-size: .62rem; margin-left: auto; }.language-row__bar { background: rgba(255,255,255,.035); border-radius: 999px; height: .3rem; overflow: hidden; }.language-row__bar i { border-radius: inherit; display: block; height: 100%; }.language-row > b { color: var(--color-secondary); font-family: var(--font-mono); font-size: .6rem; font-weight: 500; text-align: right; }.analytics-note,.analytics-empty { border-top: 1px solid var(--color-border); color: var(--color-dim); font-size: .62rem; line-height: 1.6; margin: 2rem 0 0; padding-top: 1.2rem; }.analytics-loading { display: grid; gap: .8rem; margin-top: 2rem; }.analytics-loading span { animation: fade 1.5s ease-in-out infinite alternate; background: rgba(255,255,255,.045); border-radius: .3rem; height: 1.1rem; }.analytics-loading span:nth-child(2) { width: 85%; }.analytics-loading span:nth-child(3) { width: 70%; }.analytics-loading span:nth-child(4) { width: 55%; }@keyframes fade { to { opacity: .35; } }
@media (max-width: 800px) { .stats-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }.language-row { grid-template-columns: minmax(10rem,1fr) 1fr 3rem; } }
@media (max-width: 580px) { .language-dashboard > header { align-items: flex-start; flex-direction: column; gap: .6rem; }.language-row { gap: .6rem; grid-template-columns: 1fr 2.8rem; }.language-row__bar { grid-column: 1/-1; grid-row: 2; }.language-row > b { grid-column: 2; grid-row: 1; }.language-row__label span { display: none; } }
@media (prefers-reduced-motion: reduce) { .analytics-loading span { animation: none; } }
</style>
