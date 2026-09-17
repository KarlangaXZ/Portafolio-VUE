<script setup lang="ts">
import { ArrowUp } from '@lucide/vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const isVisible = ref(false)
function handleScroll(): void { isVisible.value = window.scrollY > 600 }
function scrollToTop(): void {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
}
onMounted(() => { handleScroll(); window.addEventListener('scroll', handleScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <Transition name="back-to-top">
    <button v-if="isVisible" class="back-to-top" type="button" aria-label="Back to top" title="Back to top" @click="scrollToTop"><ArrowUp :size="18" :stroke-width="1.8" /><span>Top</span></button>
  </Transition>
</template>

<style scoped>
.back-to-top { align-items: center; backdrop-filter: blur(16px); background: rgba(16,19,26,.9); border: 1px solid var(--color-border-strong); border-radius: 999px; bottom: 1.25rem; color: var(--color-secondary); cursor: pointer; display: flex; font: .6rem var(--font-mono); gap: .5rem; min-height: 2.8rem; padding: 0 1rem; position: fixed; right: 1.25rem; z-index: 45; }
.back-to-top:hover { border-color: var(--color-muted); color: var(--color-accent); }
.back-to-top-enter-active, .back-to-top-leave-active { transition: opacity 180ms ease, transform 180ms ease; }
.back-to-top-enter-from, .back-to-top-leave-to { opacity: 0; transform: translateY(8px); }
@media (max-width: 480px) { .back-to-top { height: 2.8rem; justify-content: center; padding: 0; width: 2.8rem; } .back-to-top span { display: none; } }
</style>
