import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

export function useScrollReveal<T extends HTMLElement>(): Ref<T | null> {
  const target = ref<T | null>(null) as Ref<T | null>
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      target.value?.classList.add('is-visible')
      return
    }

    observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      entry.target.classList.add('is-visible')
      observer?.unobserve(entry.target)
    }, { threshold: 0.12, rootMargin: '0px 0px -48px' })

    observer.observe(target.value)
  })

  onBeforeUnmount(() => observer?.disconnect())
  return target
}
