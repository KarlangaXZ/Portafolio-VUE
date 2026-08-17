<script setup lang="ts">
import { BriefcaseBusiness, GitFork } from '@lucide/vue'

const currentYear = new Date().getFullYear()
const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
]
</script>

<template>
  <footer class="footer">
    <div class="container footer__main">
      <div class="footer__brand"><a href="#home" aria-label="Carlos Linares, back to home"><span>CL</span><i>.</i></a><div><strong>Carlos Linares</strong><p>Full Stack Developer <span>|</span> Development Analyst</p></div></div>
      <nav aria-label="Footer navigation"><a v-for="link in footerLinks" :key="link.href" :href="link.href">{{ link.label }}</a></nav>
      <div class="footer__socials">
        <a href="https://github.com/KarlangaXZ" target="_blank" rel="noopener noreferrer" aria-label="Open Carlos Linares on GitHub"><GitFork :size="18" /></a>
        <a href="https://linkedin.com/in/carlosjlinares/" target="_blank" rel="noopener noreferrer" aria-label="Open Carlos Linares on LinkedIn"><BriefcaseBusiness :size="18" /></a>
      </div>
    </div>
    <div class="container footer__bottom"><span>© {{ currentYear }} Carlos Linares</span><span>Built with Vue.js &amp; TypeScript.</span></div>
  </footer>
</template>

<style scoped>
.footer { background: #06090f; border-top: 1px solid var(--color-border); }.footer__main { align-items: center; display: grid; gap: 2rem; grid-template-columns: 1fr auto auto; padding-block: 3rem; }.footer__brand { align-items: center; display: flex; gap: 1rem; }.footer__brand > a { color: var(--color-text); font-family: var(--font-mono); font-size: .9rem; font-weight: 500; }.footer__brand > a span { border: 1px solid var(--color-border-strong); border-radius: .45rem; padding: .4rem .45rem; }.footer__brand > a i { color: var(--color-accent); font-style: normal; margin-left: .1rem; }.footer__brand strong { font-size: .78rem; }.footer__brand p { color: var(--color-dim); font-size: .64rem; margin: .3rem 0 0; }.footer__brand p span { color: var(--color-accent); margin-inline: .25rem; }nav { display: flex; flex-wrap: wrap; gap: 1.1rem; }nav a { color: var(--color-muted); font-size: .65rem; font-weight: 600; transition: color 160ms ease; }nav a:hover { color: var(--color-text); }.footer__socials { display: flex; gap: .45rem; }.footer__socials a { align-items: center; border: 1px solid var(--color-border); border-radius: .55rem; color: var(--color-muted); display: flex; height: 2.45rem; justify-content: center; transition: border-color 160ms ease,color 160ms ease; width: 2.45rem; }.footer__socials a:hover { border-color: rgba(89,255,189,.28); color: var(--color-accent); }.footer__bottom { border-top: 1px solid var(--color-border); color: var(--color-dim); display: flex; font-family: var(--font-mono); font-size: .62rem; justify-content: space-between; padding-block: 1.2rem; }
@media (max-width: 850px) { .footer__main { grid-template-columns: 1fr auto; }nav { grid-column: 1/-1; grid-row: 2; } }
@media (max-width: 520px) { .footer__main { align-items: start; grid-template-columns: 1fr; }.footer__socials { grid-row: auto; }nav { grid-column: auto; grid-row: auto; line-height: 2; }.footer__bottom { flex-direction: column; gap: .5rem; } }
</style>
