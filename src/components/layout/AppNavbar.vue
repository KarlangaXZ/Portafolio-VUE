<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { GitFork, Menu, X } from '@lucide/vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { navigationItems } from '@/data/navigation'

const isOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref('')
const desktopLinks = navigationItems.filter((item) => item.href !== '#contact')
let sectionObserver: IntersectionObserver | null = null

function closeMenu(): void { isOpen.value = false }
function handleScroll(): void { isScrolled.value = window.scrollY > 16 }
function handleKeydown(event: KeyboardEvent): void { if (event.key === 'Escape') closeMenu() }
function handleResize(): void { if (window.innerWidth > 860) closeMenu() }
function isActive(href: string): boolean { return activeSection.value === href.slice(1) }

watch(isOpen, (open) => { document.body.style.overflow = open ? 'hidden' : '' })

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', handleResize)
  sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
    if (visible?.target.id) activeSection.value = visible.target.id
  }, { rootMargin: '-28% 0px -58% 0px', threshold: [0, 0.2, 0.5] })
  for (const item of navigationItems) {
    const section = document.querySelector<HTMLElement>(item.href)
    if (section) sectionObserver.observe(section)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', handleResize)
  sectionObserver?.disconnect()
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="navbar" :class="{ 'navbar--scrolled': isScrolled }">
    <nav class="navbar__inner container" aria-label="Main navigation">
      <a class="brand" href="#home" aria-label="Carlos Linares, home"><span class="brand__mark">CL</span><span class="brand__dot">.</span></a>
      <div class="navbar__links">
        <a v-for="item in desktopLinks" :key="item.href" :href="item.href" :class="{ 'is-active': isActive(item.href) }" :aria-current="isActive(item.href) ? 'location' : undefined">{{ item.label }}</a>
      </div>
      <div class="navbar__actions">
        <BaseButton href="https://github.com/KarlangaXZ" variant="ghost" external :icon="GitFork">GitHub</BaseButton>
        <BaseButton href="#contact" variant="secondary" class="contact-cta" :class="{ 'is-active': isActive('#contact') }">Contact</BaseButton>
      </div>
      <button class="menu-toggle" type="button" :aria-expanded="isOpen" aria-controls="mobile-navigation" aria-label="Toggle navigation" @click="isOpen = !isOpen"><X v-if="isOpen" :size="22" /><Menu v-else :size="22" /></button>
    </nav>

    <Transition name="mobile-menu">
      <div v-if="isOpen" id="mobile-navigation" class="mobile-menu container">
        <a v-for="item in navigationItems" :key="item.href" :href="item.href" :class="{ 'is-active': isActive(item.href) }" :aria-current="isActive(item.href) ? 'location' : undefined" @click="closeMenu">{{ item.label }}</a>
        <a href="https://github.com/KarlangaXZ" target="_blank" rel="noopener noreferrer" @click="closeMenu">GitHub</a>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.navbar { border-bottom: 1px solid transparent; left: 0; position: fixed; right: 0; top: 0; transition: background 180ms ease,border-color 180ms ease; z-index: 50; }.navbar--scrolled { backdrop-filter: blur(18px); background: rgba(8,11,18,.82); border-color: var(--color-border); }.navbar__inner { align-items: center; display: flex; height: 5rem; justify-content: space-between; }.brand { color: var(--color-text); font-family: var(--font-mono); font-size: 1.1rem; font-weight: 500; letter-spacing: -.05em; }.brand__mark { border: 1px solid var(--color-border-strong); border-radius: .5rem; padding: .45rem .5rem; }.brand__dot { color: var(--color-accent); margin-left: .15rem; }.navbar__links,.navbar__actions { align-items: center; display: flex; gap: 1.5rem; }.navbar__links a { color: var(--color-muted); font-size: .79rem; font-weight: 600; position: relative; transition: color 160ms ease; }.navbar__links a::after { background: var(--color-accent); border-radius: 999px; bottom: -.65rem; content: ''; height: 2px; left: 50%; opacity: 0; position: absolute; transform: translateX(-50%) scaleX(.4); transition: opacity 160ms ease,transform 160ms ease; width: 1rem; }.navbar__links a:hover,.navbar__links a.is-active { color: var(--color-text); }.navbar__links a.is-active::after { opacity: .8; transform: translateX(-50%) scaleX(1); }.navbar__actions { gap: .35rem; }.navbar__actions :deep(.contact-cta.is-active) { border-color: rgba(89,255,189,.4); color: var(--color-accent); }.menu-toggle { align-items: center; background: transparent; border: 1px solid var(--color-border-strong); border-radius: .6rem; color: var(--color-text); display: none; height: 2.65rem; justify-content: center; width: 2.65rem; }.mobile-menu { background: rgba(8,11,18,.98); display: none; flex-direction: column; max-height: calc(100vh - 5rem); overflow-y: auto; }.mobile-menu a { border-top: 1px solid var(--color-border); color: var(--color-muted); padding: 1rem 0; }.mobile-menu a.is-active { color: var(--color-accent); }.mobile-menu-enter-active,.mobile-menu-leave-active { transition: opacity 180ms ease,transform 180ms ease; }.mobile-menu-enter-from,.mobile-menu-leave-to { opacity: 0; transform: translateY(-6px); }
@media (max-width: 860px) { .navbar__links,.navbar__actions { display: none; }.menu-toggle,.mobile-menu { display: flex; } }
@media (prefers-reduced-motion: reduce) { .mobile-menu-enter-active,.mobile-menu-leave-active { transition: none; } }
</style>
