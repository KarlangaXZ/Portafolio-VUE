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
      <SectionHeading number="07" eyebrow="By the numbers" title="A public work in progress." description="A transparent view of public work and the languages detected across recently updated projects." />

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
.github-stats { border-top: 1px solid var(--color-border); }
.stats-grid { border-block: 1px solid var(--color-border); display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 4rem; padding-block: 2.5rem; }
.stats-grid article { border-right: 1px solid var(--color-border); padding-inline: 2rem; }
.stats-grid article:first-child { padding-left: 0; }
.stats-grid article:last-child { border: 0; }
.stats-grid svg { color: var(--color-dim); height: 16px; width: 16px; }
.stats-grid strong { display: block; font-size: clamp(3rem, 6vw, 6rem); font-weight: 400; letter-spacing: -.07em; line-height: 1; margin-top: 1.5rem; }
.stats-grid span { color: var(--color-muted); display: block; font: .6rem/1.7 var(--font-mono); letter-spacing: .06em; margin-top: 1rem; text-transform: uppercase; }
.language-dashboard { display: grid; gap: 0 4rem; grid-template-columns: minmax(0, .5fr) minmax(0, 1fr); margin-top: 4rem; }
.language-dashboard > header { grid-column: 1; grid-row: 1/4; }
.language-dashboard header p { color: var(--color-dim); font: .6rem var(--font-mono); letter-spacing: .1em; margin: 0 0 1rem; text-transform: uppercase; }
.language-dashboard h3 { font-size: clamp(1.5rem, 2.5vw, 2.4rem); font-weight: 500; letter-spacing: -.045em; margin: 0 0 1.5rem; }
.language-dashboard header > span { color: var(--color-muted); font: .65rem/1.7 var(--font-mono); }
.language-segments { background: var(--color-surface); border-radius: 3px; display: flex; grid-column: 2; height: .5rem; overflow: hidden; }
.language-segments i { display: block; min-width: 2px; opacity: .8; }
.language-list { display: grid; gap: 1.5rem; grid-column: 2; margin-top: 2rem; }
.language-row { align-items: center; display: grid; gap: .65rem 1rem; grid-template-columns: minmax(0, 1fr) 3rem; }
.language-row__label { align-items: center; display: flex; gap: .6rem; min-width: 0; }
.language-row__label > i { border-radius: 50%; flex-shrink: 0; height: 5px; width: 5px; }
.language-row__label strong { font-size: .8rem; font-weight: 500; }
.language-row__label span { color: var(--color-dim); font: .6rem var(--font-mono); margin-left: auto; }
.language-row__bar { background: var(--color-surface); grid-column: 1/-1; grid-row: 2; height: 2px; overflow: hidden; }
.language-row__bar i { display: block; height: 100%; }
.language-row > b { color: var(--color-secondary); font: .65rem var(--font-mono); grid-column: 2; grid-row: 1; text-align: right; }
.analytics-note, .analytics-empty { color: var(--color-dim); font-size: .7rem; grid-column: 2; line-height: 1.8; margin: 2rem 0 0; }
.analytics-loading { display: grid; gap: 1.5rem; grid-column: 2; }
.analytics-loading span { animation: fade 1.5s ease-in-out infinite alternate; background: rgba(255,255,255,.045); height: 1.1rem; }
@keyframes fade { to { opacity: .35; } }
@media (max-width: 760px) { .language-dashboard { grid-template-columns: 1fr; gap: 2rem; } .language-dashboard > header { grid-row: auto; } .language-dashboard > * { grid-column: 1; } .language-list, .analytics-note { margin-top: 0; } .stats-grid article { padding-inline: 1rem; } }
@media (max-width: 480px) { .stats-grid { gap: 2rem 0; grid-template-columns: repeat(2, minmax(0, 1fr)); } .stats-grid article:nth-child(2n) { border: 0; } .stats-grid article:nth-child(3) { padding-left: 0; } .language-row__label span { display: none; } }
@media (prefers-reduced-motion: reduce) { .analytics-loading span { animation: none; } }
</style>
