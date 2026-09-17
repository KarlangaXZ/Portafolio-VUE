<script setup lang="ts">
withDefaults(defineProps<{
  number?: string
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}>(), { number: undefined, description: undefined, align: 'left' })
</script>

<template>
  <header class="section-heading" :class="`section-heading--${align}`">
    <p class="section-heading__eyebrow"><span v-if="number" class="section-heading__number">{{ number }} /</span>{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
    <p v-if="description" class="section-heading__description">{{ description }}</p>
  </header>
</template>

<style scoped>
.section-heading { max-width: 64rem; }
.section-heading__eyebrow { align-items: center; color: var(--color-muted); display: flex; font: .7rem var(--font-mono); gap: 1rem; letter-spacing: .12em; margin: 0 0 2rem; text-transform: uppercase; }
.section-heading__number { color: var(--color-accent); }
h2 { font-size: clamp(2.7rem, 5.5vw, 5.5rem); font-weight: 550; letter-spacing: -.065em; line-height: 1.05; margin: 0; text-wrap: balance; }
.section-heading__description { color: var(--color-muted); font-size: clamp(1rem, 1.4vw, 1.1rem); line-height: 1.8; margin: 1.5rem 0 0; max-width: 36rem; }
.section-heading--center { margin-inline: auto; text-align: center; }
.section-heading--center .section-heading__eyebrow { justify-content: center; }
.section-heading--center .section-heading__description { margin-inline: auto; }
</style>
