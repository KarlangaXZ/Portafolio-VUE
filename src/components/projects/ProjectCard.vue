<script setup lang="ts">
import { ArrowUpRight, GitFork, Maximize2 } from '@lucide/vue'
import type { Project } from '@/types/project'
withDefaults(defineProps<{ project: Project; primary?: boolean; number?: number }>(), { primary: false, number: 1 })
const emit = defineEmits<{ select: [project: Project] }>()
</script>

<template>
  <article class="project-card" :class="{ 'project-card--primary': primary }">
    <div class="project-card__visual">
      <img v-if="project.image" :src="project.image" :alt="`${project.title} project preview`" loading="lazy" decoding="async" width="1600" height="900" />
      <div v-else class="project-placeholder" aria-hidden="true">
        <div class="project-placeholder__bar"><span>{{ project.category }}</span><span>{{ String(number).padStart(2, '0') }}</span></div>
        <div class="project-placeholder__content"><span>{{ project.title }}</span><div><i v-for="highlight in project.highlights.slice(0, 3)" :key="highlight">{{ highlight }}</i></div></div>
      </div>
      <span class="project-card__category">{{ project.image ? 'PROJECT PREVIEW' : 'PROJECT OVERVIEW' }}</span>
    </div>
    <div class="project-card__content">
      <span class="project-card__featured">{{ String(number).padStart(2, '0') }} / {{ primary ? 'FEATURED PROJECT' : project.category }}</span>
      <h3>{{ project.title }}</h3>
      <p>{{ project.longDescription ?? project.description }}</p>
      <ul aria-label="Main technologies"><li v-for="technology in project.technologies" :key="technology">{{ technology }}</li></ul>
      <div class="project-card__actions">
        <button type="button" @click="emit('select', project)"><Maximize2 :size="15" aria-hidden="true" />Details</button>
        <a :href="project.githubUrl" target="_blank" rel="noopener noreferrer" :aria-label="`View ${project.title} on GitHub`"><GitFork :size="16" aria-hidden="true" />GitHub</a>
        <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" rel="noopener noreferrer" :aria-label="`Open live demo for ${project.title}`">Live demo<ArrowUpRight :size="15" aria-hidden="true" /></a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-card { align-items: center; display: grid; gap: clamp(2rem, 5vw, 5rem); grid-template-columns: minmax(0, 1.25fr) minmax(0, .8fr); min-width: 0; }
.project-card:nth-child(2n) { grid-template-columns: minmax(0, .8fr) minmax(0, 1.25fr); }
.project-card:nth-child(2n) .project-card__visual { grid-column: 2; grid-row: 1; }
.project-card:nth-child(2n) .project-card__content { grid-column: 1; grid-row: 1; }
.project-card--primary { grid-template-columns: 1fr; gap: 2.5rem; }
.project-card__visual { aspect-ratio: 4/3; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: .8rem; overflow: hidden; position: relative; }
.project-card--primary .project-card__visual { aspect-ratio: 21/9; }
.project-card__visual img { display: block; height: 100%; object-fit: cover; transition: transform 400ms ease; width: 100%; }
.project-card__visual:hover img { transform: scale(1.025); }
.project-placeholder { background: #182221; height: 100%; padding: clamp(1.25rem, 3vw, 3rem); position: relative; }
.project-card:nth-child(3n + 2) .project-placeholder { background: #1d202b; }
.project-card:nth-child(3n) .project-placeholder { background: #29231f; }
.project-placeholder::after { border: 1px solid rgba(255,255,255,.06); border-radius: 50%; content: ''; height: 35rem; pointer-events: none; position: absolute; right: -15rem; top: -16rem; width: 35rem; }
.project-placeholder__bar { color: #b5bfc4; display: flex; font: .65rem var(--font-mono); justify-content: space-between; letter-spacing: .12em; text-transform: uppercase; }
.project-placeholder__content { bottom: 3.8rem; left: clamp(1.25rem, 3vw, 3rem); position: absolute; right: clamp(1.25rem, 3vw, 3rem); }
.project-placeholder__content > span { color: #eef1ec; display: block; font-size: clamp(2rem, 4vw, 4.2rem); font-weight: 500; letter-spacing: -.06em; line-height: 1.05; max-width: 12ch; }
.project-card--primary .project-placeholder__content > span { font-size: clamp(3rem, 6vw, 6rem); max-width: none; }
.project-placeholder__content div { display: flex; flex-wrap: wrap; gap: .5rem 1rem; margin-top: 1.5rem; }
.project-placeholder__content i { color: #b5bfc4; font: .6rem var(--font-mono); }
.project-card__category { bottom: 1.25rem; color: #a6b1b9; font: .55rem var(--font-mono); letter-spacing: .12em; position: absolute; right: 1.5rem; }
.project-card__featured { color: var(--color-dim); display: block; font: .65rem var(--font-mono); letter-spacing: .12em; margin-bottom: 1.5rem; text-transform: uppercase; }
h3 { font-size: clamp(2rem, 3.5vw, 3.5rem); font-weight: 500; letter-spacing: -.06em; line-height: 1.1; margin: 0; }
.project-card__content > p { color: var(--color-muted); font-size: .95rem; line-height: 1.9; margin: 1.4rem 0; }
ul { display: flex; flex-wrap: wrap; gap: .5rem; list-style: none; margin: 1.5rem 0 0; padding: 0; }
li { border: 1px solid var(--color-border); border-radius: 999px; color: var(--color-secondary); font: .62rem var(--font-mono); padding: .45rem .7rem; }
.project-card__actions { align-items: center; display: flex; flex-wrap: wrap; gap: .6rem 1.25rem; margin-top: 2rem; }
.project-card__actions button, .project-card__actions a { align-items: center; background: transparent; border: 0; border-bottom: 1px solid var(--color-border-strong); color: var(--color-secondary); cursor: pointer; display: inline-flex; font: .75rem var(--font-sans); gap: .5rem; min-height: 2.75rem; padding: .3rem 0; transition: color 180ms ease, border-color 180ms ease; }
.project-card__actions button:hover, .project-card__actions a:hover { border-color: var(--color-accent); color: var(--color-accent); }
.project-card--primary .project-card__content { display: grid; column-gap: 4rem; grid-template-columns: 1fr 1fr; }
.project-card--primary .project-card__featured { grid-column: 1/-1; }
.project-card--primary .project-card__content > p { grid-column: 2; grid-row: 2/4; margin: 0; }
.project-card--primary .project-card__actions { grid-column: 2; }
@media (max-width: 760px) { .project-card, .project-card:nth-child(2n), .project-card--primary .project-card__content { display: flex; flex-direction: column; align-items: stretch; gap: 0; } .project-card__visual { margin-bottom: 2rem; } .project-card--primary .project-card__visual { aspect-ratio: 4/3; } .project-card--primary .project-card__content > p { margin-top: 1.4rem; } }
@media (max-width: 400px) { .project-card__visual { aspect-ratio: 1; } .project-placeholder__content i { font-size: .55rem; } }
@media (prefers-reduced-motion: reduce) { .project-card__visual:hover img { transform: none; } }
</style>
