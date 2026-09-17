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
function handleResize(): void { if (window.innerWidth > 1000) closeMenu() }
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
.navbar { backdrop-filter: blur(22px); background: rgba(16,19,26,.78); border: 1px solid var(--color-border-strong); border-radius: 999px; left: 50%; max-width: 1040px; position: fixed; top: 1.25rem; transform: translateX(-50%); transition: background 180ms ease, box-shadow 180ms ease; width: calc(100% - 3rem); z-index: 50; }
.navbar--scrolled { background: rgba(16,19,26,.94); box-shadow: 0 10px 40px rgba(0,0,0,.2); }
.navbar__inner { align-items: center; display: flex; gap: 1.5rem; height: 4.4rem; justify-content: space-between; padding-inline: 1.5rem .7rem; }
.brand { font-family: var(--font-mono); font-size: 1.1rem; font-weight: 600; letter-spacing: -.08em; }
.brand__dot { color: var(--color-accent); }
.navbar__links, .navbar__actions { align-items: center; display: flex; gap: 1.5rem; }
.navbar__links a { color: var(--color-muted); font-size: .75rem; position: relative; transition: color 160ms ease; white-space: nowrap; }
.navbar__links a:hover, .navbar__links a.is-active { color: var(--color-text); }
.navbar__links a.is-active::after { background: var(--color-accent); border-radius: 50%; bottom: -.65rem; content: ''; height: 3px; left: 50%; position: absolute; width: 3px; }
.navbar__actions { gap: .3rem; }
.navbar__actions :deep(.button) { font-size: .72rem; min-height: 2.9rem; padding-inline: .9rem; }
.navbar__actions :deep(.contact-cta) { background: var(--color-text); color: var(--color-bg); }
.navbar__actions :deep(.contact-cta.is-active) { background: var(--color-accent); }
.menu-toggle { align-items: center; background: transparent; border: 1px solid var(--color-border-strong); border-radius: 50%; color: var(--color-text); cursor: pointer; display: none; height: 2.75rem; justify-content: center; width: 2.75rem; }
.mobile-menu { background: #10131a; border: 1px solid var(--color-border-strong); border-radius: 1.25rem; display: none; flex-direction: column; left: 0; max-height: calc(100dvh - 7rem); overflow-y: auto; padding: .75rem 1.5rem; position: absolute; right: 0; top: calc(100% + .6rem); }
.mobile-menu a { border-bottom: 1px solid var(--color-border); color: var(--color-secondary); font-size: .95rem; padding: 1rem 0; }
.mobile-menu a:last-child { border: 0; }
.mobile-menu a.is-active { color: var(--color-accent); }
.mobile-menu-enter-active, .mobile-menu-leave-active { transition: opacity 180ms ease, transform 180ms ease; }
.mobile-menu-enter-from, .mobile-menu-leave-to { opacity: 0; transform: translateY(-6px); }
@media (max-width: 1000px) { .navbar { top: .8rem; width: calc(100% - 2rem); } .navbar__inner { height: 4rem; } .navbar__links, .navbar__actions { display: none; } .menu-toggle, .mobile-menu { display: flex; } }
</style>
