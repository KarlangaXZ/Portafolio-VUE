<script setup lang="ts">
import { ArrowUpRight, GitFork, Maximize2 } from '@lucide/vue'
import type { Project } from '@/types/project'
withDefaults(defineProps<{ project: Project; primary?: boolean }>(), { primary: false })
const emit = defineEmits<{ select: [project: Project] }>()
</script>

<template>
  <article class="project-card" :class="{ 'project-card--primary': primary }">
    <div class="project-card__visual">
      <img v-if="project.image" :src="project.image" :alt="`${project.title} project preview`" loading="lazy" decoding="async" width="1600" height="900" />
      <div v-else class="project-placeholder" aria-hidden="true">
        <div class="project-placeholder__bar"><span></span><span></span><span></span></div>
        <div class="project-placeholder__content"><span>{{ project.slug.slice(0, 2).toUpperCase() }}</span><p>{{ project.title }}</p><div><i v-for="technology in project.technologies.slice(0, 3)" :key="technology">{{ technology }}</i></div></div>
      </div>
      <span class="project-card__category">{{ project.category }}</span>
    </div>
    <div class="project-card__content">
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>
      <ul aria-label="Main technologies"><li v-for="technology in project.technologies.slice(0, primary ? 5 : 3)" :key="technology">{{ technology }}</li></ul>
      <div class="project-card__actions">
        <button type="button" @click="emit('select', project)"><Maximize2 :size="15" aria-hidden="true" />Details</button>
        <a :href="project.githubUrl" target="_blank" rel="noopener noreferrer" :aria-label="`View ${project.title} on GitHub`"><GitFork :size="16" aria-hidden="true" />GitHub</a>
        <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" rel="noopener noreferrer" :aria-label="`Open live demo for ${project.title}`">Live<ArrowUpRight :size="15" aria-hidden="true" /></a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-card { background: linear-gradient(145deg, rgba(17,23,34,.94), rgba(10,14,22,.86)); border: 1px solid var(--color-border); border-radius: var(--radius-card); display: flex; flex-direction: column; min-width: 0; overflow: hidden; transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease; }
.project-card:hover { border-color: rgba(89,255,189,.26); box-shadow: 0 24px 60px rgba(0,0,0,.22); transform: translateY(-4px); }
.project-card__visual { aspect-ratio: 16/8.8; border-bottom: 1px solid var(--color-border); overflow: hidden; position: relative; }
.project-card--primary .project-card__visual { aspect-ratio: auto; flex: 1 1 auto; min-height: 18rem; }
.project-card__visual img { height: 100%; object-fit: cover; transition: transform 350ms ease; width: 100%; }
.project-card:hover .project-card__visual img { transform: scale(1.025); }
.project-placeholder { background: radial-gradient(circle at 80% 10%, rgba(89,255,189,.09), transparent 38%), linear-gradient(145deg,#121925,#0a0e16); height: 100%; padding: 1rem; }
.project-placeholder::after { background-image: linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px); background-size: 30px 30px; content: ''; inset: 0; mask-image: linear-gradient(135deg,black,transparent 75%); position: absolute; }
.project-placeholder__bar { display: flex; gap: .3rem; position: relative; z-index: 1; }.project-placeholder__bar span { background: #303746; border-radius: 50%; height: 5px; width: 5px; }.project-placeholder__bar span:first-child { background: var(--color-accent); }
.project-placeholder__content { bottom: 1.3rem; left: 1.3rem; position: absolute; right: 1.3rem; z-index: 1; }.project-placeholder__content > span { color: rgba(89,255,189,.35); font-family: var(--font-mono); font-size: clamp(2.5rem,6vw,5.5rem); font-weight: 500; letter-spacing: -.08em; line-height: .8; }.project-placeholder__content p { color: var(--color-text); font-size: clamp(.85rem,1.5vw,1.05rem); font-weight: 700; margin: .8rem 0 0; }.project-placeholder__content div { display: flex; flex-wrap: wrap; gap: .6rem; margin-top: .5rem; }.project-placeholder__content i { color: var(--color-dim); font-family: var(--font-mono); font-size: .62rem; font-style: normal; }
.project-card__category { backdrop-filter: blur(10px); background: rgba(8,11,18,.72); border: 1px solid var(--color-border-strong); border-radius: 999px; color: var(--color-accent); font-family: var(--font-mono); font-size: .62rem; letter-spacing: .08em; padding: .42rem .65rem; position: absolute; right: .8rem; text-transform: uppercase; top: .8rem; z-index: 2; }
.project-card--primary .project-card__content { padding: clamp(1.5rem,3vw,2.2rem); } .project-card--primary h3 { font-size: clamp(1.55rem,3vw,2.2rem); } .project-card--primary .project-card__content > p { font-size: .86rem; max-width: 42rem; } .project-card__content { display: flex; flex: 1; flex-direction: column; padding: clamp(1.2rem,2vw,1.6rem); }h3 { font-size: clamp(1.2rem,2vw,1.65rem); letter-spacing: -.04em; margin: 0; }.project-card__content > p { color: var(--color-muted); font-size: .79rem; line-height: 1.65; margin: .75rem 0 0; }ul { display: flex; flex-wrap: wrap; gap: .4rem; list-style: none; margin: 1.2rem 0 0; padding: 0; }li { color: var(--color-dim); font-family: var(--font-mono); font-size: .62rem; }li + li::before { color: rgba(89,255,189,.35); content: '/'; margin-right: .4rem; }
.project-card__actions { align-items: center; display: flex; flex-wrap: wrap; gap: .45rem; margin-top: auto; padding-top: 1.5rem; }.project-card__actions button,.project-card__actions a { align-items: center; background: rgba(255,255,255,.025); border: 1px solid var(--color-border); border-radius: .55rem; color: var(--color-secondary); cursor: pointer; display: inline-flex; font: 650 .65rem var(--font-sans); gap: .4rem; min-height: 2.25rem; padding: 0 .7rem; transition: border-color 160ms ease,color 160ms ease; }.project-card__actions button:hover,.project-card__actions a:hover { border-color: rgba(89,255,189,.28); color: var(--color-text); }.project-card__actions :focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { .project-card:hover { transform: none; }.project-card:hover .project-card__visual img { transform: none; } }
</style>
