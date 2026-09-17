<script setup lang="ts">
import { ArrowDownRight, BriefcaseBusiness, GitFork, MapPin } from '@lucide/vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { professionalExperience } from '@/data/experience'
import { primaryTechnologies } from '@/data/technologies'
const currentExperience = professionalExperience.find((item) => item.period === 'Current')
</script>

<template>
  <section id="home" class="hero" aria-label="Introduction">
    <div class="container">
      <div class="hero__grid">
        <div>
          <p class="hero__eyebrow"><span></span>Available for new opportunities</p>
          <h1>I build software<br class="hero__break" /> that works <span>beautifully.</span></h1>
          <p class="hero__statement">I'm Carlos Linares, a Full Stack Developer focused on building reliable web applications, APIs and scalable systems.</p>
          <div class="hero__actions">
            <BaseButton href="#projects" :icon="ArrowDownRight">Explore my work</BaseButton>
            <BaseButton href="https://github.com/KarlangaXZ" variant="secondary" external :icon="GitFork">GitHub</BaseButton>
            <BaseButton href="https://linkedin.com/in/carlosjlinares/" variant="ghost" external :icon="BriefcaseBusiness">LinkedIn</BaseButton>
          </div>
        </div>
        <aside class="profile-card" aria-label="Developer profile">
          <div class="profile-card__top"><span class="profile-card__avatar" aria-hidden="true">CL<span>.</span></span><span class="profile-card__caption">DEVELOPER PROFILE</span></div>
          <h2>Carlos Linares</h2>
          <p class="profile-card__role">Full Stack Developer</p>
          <dl>
            <div v-if="currentExperience"><dt>Currently</dt><dd>{{ currentExperience.role }}</dd></div>
            <div><dt>Focus</dt><dd>Full Stack</dd></div>
            <div v-if="currentExperience"><dt>Location</dt><dd><MapPin :size="14" aria-hidden="true" />{{ currentExperience.location }}</dd></div>
          </dl>
          <a href="#about" class="profile-card__link">A little more about me <ArrowDownRight :size="17" aria-hidden="true" /></a>
        </aside>
      </div>
      <div class="hero__stack" aria-label="Primary technologies">
        <span class="hero__stack-label">SELECTED TOOLKIT <ArrowDownRight :size="16" aria-hidden="true" /></span>
        <ul><li v-for="technology in primaryTechnologies" :key="technology">{{ technology }}</li></ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { isolation: isolate; padding-top: clamp(10rem, 15vw, 14rem); position: relative; scroll-margin-top: 7rem; }
.hero::before { background-image: linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px); background-size: 80px 80px; content: ''; inset: 0 0 8rem; mask-image: linear-gradient(180deg, #000, transparent); pointer-events: none; position: absolute; z-index: -1; }
.hero__grid { align-items: center; display: grid; gap: clamp(2rem, 4vw, 4rem); grid-template-columns: minmax(0, 1fr) minmax(260px, .4fr); min-height: 36rem; padding-bottom: 6rem; }
.hero__eyebrow { align-items: center; background: rgba(16,19,26,.65); border: 1px solid var(--color-border); border-radius: 999px; color: var(--color-secondary); display: inline-flex; font: .7rem var(--font-mono); gap: .65rem; margin: 0 0 2.3rem; padding: .65rem .85rem; }
.hero__eyebrow > span { background: var(--color-accent); border-radius: 50%; flex-shrink: 0; height: 6px; width: 6px; }
h1 { font-size: clamp(3.5rem, 7vw, 7rem); font-weight: 600; letter-spacing: -.075em; line-height: 1.02; margin: 0; }
h1 span { color: var(--color-text); display: block; font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-weight: 400; letter-spacing: -.07em; }
.hero__statement { color: var(--color-muted); font-size: 1.05rem; line-height: 1.85; margin: 2rem 0 0; max-width: 31rem; }
.hero__actions { display: flex; flex-wrap: wrap; gap: .65rem; margin-top: 2.3rem; }
.profile-card { align-self: end; background: var(--color-surface); border: 1px solid var(--color-border-strong); border-radius: 1.25rem; margin-bottom: 1rem; overflow: hidden; padding: 1.7rem; position: relative; }
.profile-card::before { background: linear-gradient(90deg, var(--color-accent), transparent); content: ''; height: 1px; left: 1.7rem; position: absolute; right: 1.7rem; top: 0; }
.profile-card__top { align-items: center; display: flex; gap: 1rem; justify-content: space-between; margin-bottom: 3rem; }
.profile-card__avatar { align-items: center; border: 1px solid var(--color-border-strong); border-radius: 50%; display: flex; flex-shrink: 0; font-size: 1.3rem; font-weight: 600; height: 4rem; justify-content: center; width: 4rem; }
.profile-card__avatar span { color: var(--color-accent); }
.profile-card__caption { color: var(--color-dim); font: .58rem/1.7 var(--font-mono); letter-spacing: .12em; max-width: 6rem; text-align: right; }
h2 { font-size: 1.6rem; font-weight: 550; letter-spacing: -.04em; margin: 0; }
.profile-card__role { color: var(--color-muted); font-size: .8rem; margin: .5rem 0 2rem; }
dl { border-top: 1px solid var(--color-border); margin: 0; padding-block: .75rem; }
dl > div { padding: .65rem 0; }
dt { color: var(--color-dim); font: .6rem var(--font-mono); margin-bottom: .35rem; text-transform: uppercase; }
dd { align-items: center; display: flex; flex-wrap: wrap; gap: .35rem; font-size: .8rem; margin: 0; }
.profile-card__link { align-items: center; border-top: 1px solid var(--color-border); color: var(--color-secondary); display: flex; font-size: .7rem; gap: .5rem; justify-content: space-between; padding-top: 1.2rem; }
.profile-card__link:hover { color: var(--color-accent); }
.hero__stack { align-items: center; border-block: 1px solid var(--color-border); display: flex; gap: 2rem; justify-content: space-between; padding-block: 2rem; }
.hero__stack-label { align-items: center; color: var(--color-dim); display: flex; font: .6rem var(--font-mono); gap: 1rem; letter-spacing: .1em; white-space: nowrap; }
.hero__stack ul { display: flex; flex-wrap: wrap; gap: .8rem 0; list-style: none; margin: 0; padding: 0; }
.hero__stack li { color: var(--color-secondary); font: .75rem var(--font-mono); letter-spacing: .05em; text-transform: uppercase; }
.hero__stack li + li::before { color: var(--color-dim); content: '\00b7'; margin-inline: 1.1rem; }
@media (max-width: 1100px) { .hero__grid { grid-template-columns: minmax(0, 1fr) 260px; } .hero__stack { align-items: start; flex-direction: column; gap: 1rem; } }
@media (max-width: 850px) { .hero { padding-top: 9rem; } .hero__grid { grid-template-columns: 1fr; gap: 3rem; padding-bottom: 4rem; } h1 { font-size: clamp(3.5rem, 10vw, 5.8rem); } .profile-card { max-width: 36rem; width: 100%; } .profile-card__top { margin-bottom: 1.8rem; } dl { display: flex; flex-wrap: wrap; gap: 1rem 2rem; } }
@media (max-width: 400px) { h1 { font-size: clamp(3rem, 15vw, 3.75rem); } .hero__break { display: none; } .hero__eyebrow { font-size: .6rem; } .hero__actions :deep(.button:first-child) { flex-basis: 100%; } .hero__stack li + li::before { margin-inline: .65rem; } }
</style>
