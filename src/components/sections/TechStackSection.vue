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
const technologyGroups = computed(() => technologyCategories
  .filter((category) => category.id !== 'all')
  .map((category) => ({ ...category, items: filteredTechnologies.value.filter((technology) => technology.category === category.id) }))
  .filter((category) => category.items.length))
</script>

<template>
  <section id="skills" ref="sectionRef" class="stack section scroll-reveal" aria-label="Technology stack">
    <div class="container stack__content">
      <SectionHeading number="05" eyebrow="Tech stack" title="The right tools. A considered approach." description="From the interface to the database: the technologies behind my work." />
      <div class="stack__filters" role="group" aria-label="Filter technologies by category">
        <button v-for="category in technologyCategories" :key="category.id" type="button" :class="{ 'is-active': activeCategory === category.id }" :aria-pressed="activeCategory === category.id" @click="activeCategory = category.id">
          {{ category.label }}
        </button>
      </div>
      <div class="stack__groups">
        <div v-for="(group, index) in technologyGroups" :key="group.id" class="stack__group">
          <h3><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ group.label }}</h3>
          <div class="stack__items">
            <component :is="technology.url ? 'a' : 'div'" v-for="technology in group.items" :key="technology.name" class="technology-card" :href="technology.url" :target="technology.url ? '_blank' : undefined" :rel="technology.url ? 'noreferrer' : undefined">
              <span class="technology-card__icon"><TechnologyIcon :icon="technology.icon" :title="technology.name" /></span>
              <span>{{ technology.name }}</span>
            </component>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stack { border-top: 1px solid var(--color-border); }
.stack__filters { display: flex; flex-wrap: wrap; gap: .25rem 1.5rem; margin: 3rem 0 2rem; }
.stack__filters button { background: transparent; border: 0; border-bottom: 1px solid transparent; color: var(--color-muted); cursor: pointer; font: .7rem var(--font-mono); min-height: 2.75rem; padding: .5rem 0; }
.stack__filters button:hover { color: var(--color-text); }
.stack__filters button.is-active { border-color: var(--color-accent); color: var(--color-text); }
.stack__group { border-top: 1px solid var(--color-border); display: grid; gap: 2rem; grid-template-columns: minmax(0, .4fr) minmax(0, 1fr); padding: 2rem 0; }
h3 { align-items: baseline; display: flex; font-size: 1.3rem; font-weight: 500; gap: 1rem; letter-spacing: -.03em; margin: .65rem 0 0; }
h3 span { color: var(--color-dim); font: .6rem var(--font-mono); }
.stack__items { align-content: start; display: flex; flex-wrap: wrap; gap: .5rem 1.7rem; }
.technology-card { align-items: center; color: var(--color-secondary); display: inline-flex; font-size: .82rem; gap: .65rem; min-height: 3rem; padding-block: .5rem; }
.technology-card__icon { color: var(--color-dim); }
.technology-card__icon :deep(svg) { height: 1.15rem; width: 1.15rem; }
a.technology-card:hover { color: var(--color-accent); }
@media (max-width: 650px) { .stack__group { grid-template-columns: 1fr; gap: 1rem; } .stack__items { gap: .35rem 1.4rem; } }
</style>
