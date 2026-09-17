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
.footer { background: var(--color-surface); }
.footer__main { align-items: start; border-top: 1px solid var(--color-border); display: grid; gap: 3rem; grid-template-columns: 1fr auto auto; padding-block: 3rem; }
.footer__brand { align-items: center; display: flex; gap: 1.2rem; }
.footer__brand > a { font: 1.5rem var(--font-mono); letter-spacing: -.1em; }
.footer__brand > a i { color: var(--color-accent); font-style: normal; }
.footer__brand strong { font-size: .85rem; font-weight: 500; }
.footer__brand p { color: var(--color-dim); font-size: .65rem; line-height: 1.8; margin: .35rem 0 0; }
.footer__brand p span { margin-inline: .3rem; }
nav { display: grid; gap: .25rem 2rem; grid-template-columns: 1fr 1fr; }
nav a { color: var(--color-muted); font-size: .7rem; padding-block: .5rem; }
nav a:hover { color: var(--color-text); }
.footer__socials { display: flex; gap: .5rem; }
.footer__socials a { align-items: center; border: 1px solid var(--color-border-strong); border-radius: 50%; color: var(--color-secondary); display: flex; height: 2.8rem; justify-content: center; width: 2.8rem; }
.footer__socials a:hover { color: var(--color-accent); }
.footer__bottom { border-top: 1px solid var(--color-border); color: var(--color-dim); display: flex; font: .6rem var(--font-mono); gap: 1rem; justify-content: space-between; padding-block: 1.5rem; }
@media (max-width: 850px) { .footer__main { grid-template-columns: 1fr auto; } nav { grid-column: 1; } .footer__socials { grid-column: 2; grid-row: 1; } }
@media (max-width: 480px) { .footer__main { grid-template-columns: 1fr; gap: 2rem; } .footer__socials { grid-column: 1; grid-row: auto; } .footer__bottom { flex-direction: column; line-height: 1.6; } }
</style>
