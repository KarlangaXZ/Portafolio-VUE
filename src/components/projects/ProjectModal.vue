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
.modal-backdrop { align-items: center; backdrop-filter: blur(8px); background: rgba(9,11,16,.8); display: flex; inset: 0; justify-content: center; padding: 1rem; position: fixed; z-index: 100; }
.modal { background: var(--color-surface); border: 1px solid var(--color-border-strong); border-radius: 1rem; max-height: 85dvh; max-width: 56rem; overflow-y: auto; padding: clamp(1.5rem, 5vw, 4rem); position: relative; width: 100%; }
.modal__close { align-items: center; background: transparent; border: 1px solid var(--color-border-strong); border-radius: 50%; color: var(--color-secondary); cursor: pointer; display: flex; height: 2.75rem; justify-content: center; position: absolute; right: 1.2rem; top: 1.2rem; width: 2.75rem; }
.modal__close:hover { color: var(--color-accent); }
.modal__category { color: var(--color-muted); font: .65rem/1.7 var(--font-mono); letter-spacing: .1em; margin: 0 3rem 2rem 0; text-transform: uppercase; }
h2 { font-size: clamp(2.2rem, 6vw, 4.5rem); font-weight: 500; letter-spacing: -.06em; line-height: 1.05; margin: 0; overflow-wrap: anywhere; }
.modal__description { color: var(--color-muted); font-size: 1rem; line-height: 1.85; margin: 1.5rem 0 0; }
.modal__grid { border-top: 1px solid var(--color-border); display: grid; gap: 3rem; grid-template-columns: minmax(0, 1.2fr) minmax(0, .8fr); margin-top: 2.5rem; padding-top: 2rem; }
h3 { color: var(--color-dim); font: .65rem var(--font-mono); letter-spacing: .1em; margin: 0 0 1.5rem; text-transform: uppercase; }
ul { display: grid; gap: 1rem; list-style: none; margin: 0; padding: 0; }
li { align-items: start; color: var(--color-secondary); display: flex; font-size: .85rem; gap: .7rem; line-height: 1.6; }
li svg { color: var(--color-dim); flex-shrink: 0; margin-top: .2rem; }
.modal__stack { display: flex; flex-wrap: wrap; gap: .5rem; }
.modal__stack span { border: 1px solid var(--color-border-strong); border-radius: 999px; color: var(--color-secondary); font: .65rem var(--font-mono); padding: .5rem .75rem; }
footer { border-top: 1px solid var(--color-border); display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 2.5rem; padding-top: 2rem; }
footer a { align-items: center; background: var(--color-text); border: 1px solid transparent; border-radius: 999px; color: var(--color-bg); display: flex; font-size: .75rem; gap: .6rem; min-height: 3rem; padding: .65rem 1.25rem; }
footer a + a { background: transparent; border-color: var(--color-border-strong); color: var(--color-text); }
footer a:hover { background: var(--color-accent); color: var(--color-bg); }
.modal-enter-active, .modal-leave-active { transition: opacity 180ms ease; }
.modal-enter-active .modal, .modal-leave-active .modal { transition: transform 180ms ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal, .modal-leave-to .modal { transform: translateY(10px); }
@media (max-width: 600px) { .modal__grid { grid-template-columns: 1fr; } }
</style>
