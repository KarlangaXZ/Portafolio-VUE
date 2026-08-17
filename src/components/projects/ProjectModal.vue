<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ArrowUpRight, Check, GitFork, X } from '@lucide/vue'
import type { Project } from '@/types/project'
const props = defineProps<{ project: Project | null }>()
const emit = defineEmits<{ close: [] }>()
const closeButton = ref<HTMLButtonElement | null>(null)
const modalElement = ref<HTMLElement | null>(null)
let previousFocus: HTMLElement | null = null
function close(): void { emit('close') }
function handleKeydown(event: KeyboardEvent): void {
  if (!props.project) return
  if (event.key === 'Escape') {
    close()
    return
  }
  if (event.key !== 'Tab' || !modalElement.value) return
  const focusable = [...modalElement.value.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])')]
  const first = focusable[0]
  const last = focusable.at(-1)
  if (!first || !last) return
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
}
watch(() => props.project, async (project) => {
  if (project) {
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.style.overflow = 'hidden'
    await nextTick()
    closeButton.value?.focus()
  } else {
    document.body.style.overflow = ''
    previousFocus?.focus()
    previousFocus = null
  }
})
onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => { window.removeEventListener('keydown', handleKeydown); document.body.style.overflow = '' })
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="project" class="modal-backdrop" role="presentation" @mousedown.self="close">
        <section ref="modalElement" class="modal" role="dialog" aria-modal="true" :aria-labelledby="`project-${project.slug}-title`" :aria-describedby="`project-${project.slug}-description`">
          <button ref="closeButton" class="modal__close" type="button" aria-label="Close project details" @click="close"><X :size="20" /></button>
          <p class="modal__category">{{ project.category }}</p>
          <h2 :id="`project-${project.slug}-title`">{{ project.title }}</h2>
          <p :id="`project-${project.slug}-description`" class="modal__description">{{ project.longDescription ?? project.description }}</p>
          <div class="modal__grid">
            <div><h3>Highlights</h3><ul><li v-for="highlight in project.highlights" :key="highlight"><Check :size="15" aria-hidden="true" />{{ highlight }}</li></ul></div>
            <div><h3>Technology stack</h3><div class="modal__stack"><span v-for="technology in project.technologies" :key="technology">{{ technology }}</span></div></div>
          </div>
          <footer>
            <a :href="project.githubUrl" target="_blank" rel="noopener noreferrer"><GitFork :size="17" />View on GitHub</a>
            <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" rel="noopener noreferrer">Live Demo<ArrowUpRight :size="17" /></a>
          </footer>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop { align-items: center; background: rgba(2,4,8,.78); display: flex; inset: 0; justify-content: center; padding: 1.25rem; position: fixed; z-index: 100; }.modal { background: linear-gradient(145deg,#121824,#090d15); border: 1px solid var(--color-border-strong); border-radius: var(--radius-panel); box-shadow: 0 30px 100px rgba(0,0,0,.55); max-height: min(85vh,48rem); max-width: 46rem; overflow-y: auto; padding: clamp(1.5rem,5vw,3rem); position: relative; width: 100%; }.modal__close { align-items: center; background: rgba(255,255,255,.035); border: 1px solid var(--color-border); border-radius: .6rem; color: var(--color-muted); cursor: pointer; display: flex; height: 2.6rem; justify-content: center; position: absolute; right: 1.2rem; top: 1.2rem; width: 2.6rem; }.modal__close:hover { border-color: var(--color-border-strong); color: var(--color-text); }.modal__close:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }.modal__category { color: var(--color-accent); font-family: var(--font-mono); font-size: .62rem; letter-spacing: .1em; margin: 0 3rem .8rem 0; text-transform: uppercase; }h2 { font-size: clamp(2rem,6vw,3.5rem); letter-spacing: -.055em; line-height: 1; margin: 0; }.modal__description { color: var(--color-muted); font-size: .95rem; line-height: 1.75; margin: 1.2rem 0 0; max-width: 39rem; }.modal__grid { border-top: 1px solid var(--color-border); display: grid; gap: 2.5rem; grid-template-columns: 1.2fr .8fr; margin-top: 2rem; padding-top: 2rem; }h3 { color: var(--color-dim); font-family: var(--font-mono); font-size: .62rem; letter-spacing: .08em; margin: 0 0 1rem; text-transform: uppercase; }ul { display: grid; gap: .7rem; list-style: none; margin: 0; padding: 0; }li { align-items: flex-start; color: var(--color-secondary); display: flex; font-size: .8rem; gap: .55rem; line-height: 1.45; }li svg { color: var(--color-accent); flex: 0 0 auto; margin-top: .1rem; }.modal__stack { display: flex; flex-wrap: wrap; gap: .4rem; }.modal__stack span { background: rgba(255,255,255,.035); border: 1px solid var(--color-border); border-radius: 999px; color: var(--color-secondary); font-family: var(--font-mono); font-size: .62rem; padding: .42rem .62rem; }footer { border-top: 1px solid var(--color-border); display: flex; flex-wrap: wrap; gap: .55rem; margin-top: 2rem; padding-top: 1.5rem; }footer a { align-items: center; background: var(--color-accent); border-radius: .6rem; color: #06110d; display: flex; font-size: .72rem; font-weight: 750; gap: .5rem; min-height: 2.6rem; padding: 0 .9rem; }footer a + a { background: transparent; border: 1px solid var(--color-border-strong); color: var(--color-text); }.modal-enter-active,.modal-leave-active { transition: opacity 180ms ease; }.modal-enter-active .modal,.modal-leave-active .modal { transition: transform 180ms ease; }.modal-enter-from,.modal-leave-to { opacity: 0; }.modal-enter-from .modal,.modal-leave-to .modal { transform: translateY(10px) scale(.99); }
@media (max-width: 600px) { .modal__grid { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { .modal-enter-active,.modal-leave-active,.modal-enter-active .modal,.modal-leave-active .modal { transition: none; } }
</style>
