<script setup lang="ts">
import { computed, ref } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import TechnologyIcon from '@/components/ui/TechnologyIcon.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { technologies, technologyCategories } from '@/data/technologies'
import type { TechnologyFilter } from '@/types/technology'

const sectionRef = useScrollReveal<HTMLElement>()
void sectionRef
const activeCategory = ref<TechnologyFilter>('all')
const filteredTechnologies = computed(() => activeCategory.value === 'all'
  ? technologies
  : technologies.filter((technology) => technology.category === activeCategory.value))
</script>

<template>
  <section id="skills" ref="sectionRef" class="stack section scroll-reveal" aria-label="Technology stack">
    <div class="stack__glow" aria-hidden="true"></div>
    <div class="container stack__content">
      <SectionHeading eyebrow="Tech stack" title="Technologies I work with" description="A growing toolkit for building modern applications across frontend, backend, databases and infrastructure." align="center" />
      <div class="stack__filters" role="group" aria-label="Filter technologies by category">
        <button v-for="category in technologyCategories" :key="category.id" type="button" :class="{ 'is-active': activeCategory === category.id }" :aria-pressed="activeCategory === category.id" @click="activeCategory = category.id">
          {{ category.label }}
        </button>
      </div>
      <TransitionGroup name="technology-list" tag="div" class="stack__grid">
        <component :is="technology.url ? 'a' : 'div'" v-for="technology in filteredTechnologies" :key="technology.name" class="technology-card" :href="technology.url" :target="technology.url ? '_blank' : undefined" :rel="technology.url ? 'noreferrer' : undefined">
          <span class="technology-card__icon"><TechnologyIcon :icon="technology.icon" :title="technology.name" /></span>
          <span>{{ technology.name }}</span>
        </component>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.stack { overflow: hidden; position: relative; }
.stack::before { background-image: radial-gradient(var(--color-grid) 1px, transparent 1px); background-size: 24px 24px; content: ''; inset: 0; mask-image: linear-gradient(to bottom, transparent, black 30%, black 75%, transparent); pointer-events: none; position: absolute; }
.stack__glow { background: rgba(89, 255, 189, 0.045); border-radius: 50%; filter: blur(35px); height: 30rem; left: 50%; pointer-events: none; position: absolute; top: 25%; transform: translateX(-50%); width: 50rem; }
.stack__content { position: relative; }
.stack__filters { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin: 2.5rem auto 0; }
.stack__filters button { background: rgba(255, 255, 255, 0.025); border: 1px solid var(--color-border); border-radius: 999px; color: var(--color-muted); cursor: pointer; font-family: var(--font-mono); font-size: 0.65rem; min-height: 2.5rem; padding: 0 1rem; transition: background 180ms ease, border-color 180ms ease, color 180ms ease; }
.stack__filters button:hover { border-color: var(--color-border-strong); color: var(--color-text); }
.stack__filters button:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
.stack__filters button.is-active { background: rgba(89, 255, 189, 0.09); border-color: rgba(89, 255, 189, 0.32); color: var(--color-accent); }
.stack__grid { display: grid; gap: 0.75rem; grid-template-columns: repeat(6, minmax(0, 1fr)); margin-top: 2.2rem; min-height: 15rem; }
.technology-card { align-items: center; background: linear-gradient(145deg, rgba(18, 24, 35, 0.78), rgba(10, 14, 22, 0.82)); border: 1px solid var(--color-border); border-radius: 0.85rem; color: var(--color-secondary); display: flex; flex-direction: column; font-size: 0.72rem; font-weight: 650; gap: 0.95rem; justify-content: center; min-height: 8.2rem; padding: 1rem 0.5rem; text-align: center; transition: border-color 180ms ease, box-shadow 180ms ease, color 180ms ease, transform 180ms ease; }
.technology-card:hover { border-color: rgba(89, 255, 189, 0.3); box-shadow: 0 14px 30px rgba(0, 0, 0, 0.2), inset 0 0 24px rgba(89, 255, 189, 0.025); color: var(--color-text); transform: translateY(-4px); }
.technology-card__icon { color: #8e9bab; transition: color 180ms ease, transform 180ms ease; }
.technology-card:hover .technology-card__icon { color: var(--color-accent); transform: scale(1.08); }
.technology-list-enter-active, .technology-list-leave-active { transition: opacity 160ms ease, transform 160ms ease; }
.technology-list-enter-from, .technology-list-leave-to { opacity: 0; transform: translateY(6px); }
.technology-list-leave-active { position: absolute; }
@media (max-width: 1040px) { .stack__grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
@media (max-width: 680px) { .stack__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (max-width: 430px) { .stack__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .stack__filters { justify-content: flex-start; } }
@media (prefers-reduced-motion: reduce) { .technology-list-enter-active, .technology-list-leave-active { transition: none; } }
</style>
