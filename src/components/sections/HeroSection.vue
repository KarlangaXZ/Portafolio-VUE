<script setup lang="ts">
import { ArrowDownRight, ArrowUpRight, BriefcaseBusiness, GitFork, MapPin } from '@lucide/vue'
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <section id="home" class="hero">
    <div class="hero__glow hero__glow--one" aria-hidden="true"></div>
    <div class="hero__glow hero__glow--two" aria-hidden="true"></div>

    <div class="hero__content container">
      <div class="hero__eyebrow reveal reveal--one">
        <span class="status-dot"></span>
        Available for meaningful projects
      </div>

      <div class="hero__grid">
        <div class="hero__main">
          <p class="hero__intro reveal reveal--two">Hi, I'm</p>
          <h1 class="reveal reveal--two">Carlos <span>Linares.</span></h1>
          <p class="hero__role reveal reveal--three">Full Stack Developer <span>/</span> Development Analyst</p>
          <p class="hero__statement reveal reveal--four">I build reliable, scalable and maintainable software solutions.</p>

          <div class="hero__actions reveal reveal--four">
            <BaseButton href="#projects" :icon="ArrowDownRight">View Projects</BaseButton>
            <BaseButton href="https://github.com/KarlangaXZ" variant="secondary" external :icon="GitFork">GitHub</BaseButton>
            <BaseButton href="https://linkedin.com/in/carlosjlinares/" variant="ghost" external :icon="BriefcaseBusiness">LinkedIn</BaseButton>
          </div>
        </div>

        <aside class="code-card reveal reveal--three" aria-label="Developer profile summary">
          <div class="code-card__top"><span></span><span></span><span></span><small>profile.ts</small></div>
          <pre><code><i>const</i> developer = {
  name: <b>'Carlos Linares'</b>,
  location: <b>'Dominican Republic'</b>,
  focus: [
    <b>'Clean architecture'</b>,
    <b>'Scalable systems'</b>,
    <b>'Great experiences'</b>
  ],
  mindset: <b>'Always learning'</b>
}</code></pre>
          <div class="code-card__footer"><MapPin :size="14" /> Dominican Republic <ArrowUpRight :size="14" /></div>
        </aside>
      </div>

      <div class="hero__foot reveal reveal--four">
        <span>SCROLL TO EXPLORE</span><span class="hero__line"></span><span>01 / 11</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { align-items: center; display: flex; min-height: 100svh; overflow: hidden; padding: 8.5rem 0 3rem; position: relative; }
.hero::before { background-image: linear-gradient(var(--color-grid) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid) 1px, transparent 1px); background-size: 56px 56px; content: ''; inset: 0; mask-image: linear-gradient(to bottom, black, transparent 88%); opacity: 0.38; pointer-events: none; position: absolute; }
.hero__glow { border-radius: 999px; filter: blur(10px); pointer-events: none; position: absolute; }
.hero__glow--one { background: rgba(64, 255, 183, 0.07); height: 26rem; right: 3%; top: 10%; width: 26rem; }
.hero__glow--two { background: rgba(94, 106, 255, 0.055); bottom: -6rem; height: 22rem; left: -8rem; width: 22rem; }
.hero__content { position: relative; z-index: 1; }
.hero__eyebrow { align-items: center; color: var(--color-muted); display: flex; font-family: var(--font-mono); font-size: 0.68rem; gap: 0.7rem; letter-spacing: 0.08em; margin-bottom: 2.6rem; text-transform: uppercase; }
.status-dot { background: var(--color-accent); border-radius: 50%; box-shadow: 0 0 0 5px rgba(89, 255, 189, 0.1), 0 0 16px var(--color-accent); height: 6px; width: 6px; }
.hero__grid { align-items: center; display: grid; gap: clamp(3rem, 8vw, 8rem); grid-template-columns: minmax(0, 1.35fr) minmax(300px, 0.65fr); }
.hero__intro { color: var(--color-accent); font-family: var(--font-mono); font-size: clamp(0.9rem, 2vw, 1.05rem); margin: 0 0 0.55rem; }
h1 { font-size: clamp(4rem, 9vw, 8rem); letter-spacing: -0.075em; line-height: 0.88; margin: 0; max-width: 10ch; }
h1 span { color: transparent; -webkit-text-stroke: 1px rgba(242, 245, 249, 0.38); }
.hero__role { color: var(--color-secondary); font-size: clamp(0.9rem, 1.5vw, 1.08rem); font-weight: 600; letter-spacing: -0.02em; margin: 2rem 0 0; }
.hero__role span { color: var(--color-accent); margin: 0 0.5rem; }
.hero__statement { color: var(--color-muted); font-size: clamp(1.05rem, 1.8vw, 1.3rem); line-height: 1.65; margin: 1.15rem 0 0; max-width: 38rem; }
.hero__actions { display: flex; flex-wrap: wrap; gap: 0.55rem; margin-top: 2rem; }
.code-card { background: linear-gradient(145deg, rgba(19, 25, 36, 0.83), rgba(11, 15, 23, 0.9)); border: 1px solid var(--color-border-strong); border-radius: var(--radius-card); box-shadow: 0 28px 70px rgba(0, 0, 0, 0.25); overflow: hidden; transform: rotate(1deg); }
.code-card__top { align-items: center; border-bottom: 1px solid var(--color-border); display: flex; gap: 0.38rem; padding: 0.85rem 1rem; }
.code-card__top span { background: #303746; border-radius: 50%; height: 7px; width: 7px; }
.code-card__top span:first-child { background: #ff6b6b; }.code-card__top span:nth-child(2) { background: #ffd166; }.code-card__top span:nth-child(3) { background: #59ffbd; }
.code-card__top small { color: var(--color-dim); font-family: var(--font-mono); font-size: 0.62rem; margin-left: auto; }
pre { color: #8f9bad; font-family: var(--font-mono); font-size: clamp(0.68rem, 1vw, 0.78rem); line-height: 1.9; margin: 0; overflow-x: auto; padding: 1.5rem; }
code i { color: #c49cff; font-style: normal; } code b { color: #85e6c2; font-weight: 400; }
.code-card__footer { align-items: center; border-top: 1px solid var(--color-border); color: var(--color-dim); display: flex; font-family: var(--font-mono); font-size: 0.62rem; gap: 0.45rem; padding: 0.8rem 1rem; }
.code-card__footer svg:last-child { margin-left: auto; }
.hero__foot { align-items: center; color: var(--color-dim); display: flex; font-family: var(--font-mono); font-size: 0.58rem; gap: 1rem; letter-spacing: 0.1em; margin-top: clamp(3rem, 8vh, 6rem); }
.hero__line { background: var(--color-border-strong); height: 1px; width: 4rem; }
.reveal { animation: reveal 700ms both cubic-bezier(.2,.8,.2,1); }.reveal--one { animation-delay: 80ms; }.reveal--two { animation-delay: 160ms; }.reveal--three { animation-delay: 260ms; }.reveal--four { animation-delay: 360ms; }
@keyframes reveal { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 900px) { .hero { padding-top: 8rem; } .hero__grid { grid-template-columns: 1fr; } .code-card { max-width: 30rem; transform: none; } }
@media (max-width: 560px) { .hero { align-items: flex-start; } h1 { font-size: clamp(3.6rem, 20vw, 5rem); } .hero__actions :deep(.button) { flex: 1 1 calc(50% - 0.5rem); } .hero__actions :deep(.button:last-child) { flex-basis: 100%; } .code-card { display: none; } }
@media (prefers-reduced-motion: reduce) { .reveal { animation: none; } }
</style>
