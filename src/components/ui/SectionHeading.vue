<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}>(), { description: undefined, align: 'left' })
</script>

<template>
  <header class="section-heading" :class="`section-heading--${align}`">
    <p class="section-heading__eyebrow"><span></span>{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
    <p v-if="description" class="section-heading__description">{{ description }}</p>
  </header>
</template>

<style scoped>
.section-heading { max-width: 48rem; }
.section-heading--center { margin-inline: auto; text-align: center; }
.section-heading__eyebrow { align-items: center; color: var(--color-accent); display: flex; font-family: var(--font-mono); font-size: 0.68rem; gap: 0.7rem; letter-spacing: 0.12em; margin: 0 0 1.25rem; text-transform: uppercase; }
.section-heading--center .section-heading__eyebrow { justify-content: center; }
.section-heading__eyebrow span { background: var(--color-accent); height: 1px; width: 1.65rem; }
h2 { font-size: clamp(2.25rem, 5vw, 4.35rem); letter-spacing: -0.055em; line-height: 1.04; margin: 0; text-wrap: balance; }
.section-heading__description { color: var(--color-muted); font-size: clamp(1rem, 1.5vw, 1.12rem); line-height: 1.75; margin: 1.3rem 0 0; max-width: 43rem; }
.section-heading--center .section-heading__description { margin-inline: auto; }
</style>
