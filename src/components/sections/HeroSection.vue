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
          <h1>I build software that works <span>beautifully.</span></h1>
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
        <span class="hero__stack-label">MY CORE TOOLKIT</span>
        <ul><li v-for="technology in primaryTechnologies" :key="technology">{{ technology }}</li></ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { padding: clamp(8rem, 13vw, 12rem) 0 0; scroll-margin-top: 5rem; }
.hero__grid { align-items: center; display: grid; gap: clamp(2.5rem, 6vw, 6rem); grid-template-columns: minmax(0, 1.7fr) minmax(280px, .85fr); }
.hero__eyebrow { align-items: center; color: var(--color-secondary); display: flex; font-size: .75rem; gap: .65rem; margin: 0 0 2rem; }
.hero__eyebrow > span { background: var(--color-accent); border-radius: 50%; flex-shrink: 0; height: 6px; width: 6px; }
h1 { font-size: clamp(2.8rem, 5.5vw, 5.1rem); letter-spacing: -.065em; line-height: 1.06; margin: 0; max-width: 14ch; text-wrap: balance; }
h1 span { color: var(--color-accent); }
.hero__statement { color: var(--color-muted); font-size: clamp(1rem, 1.5vw, 1.12rem); line-height: 1.85; margin: 1.7rem 0 0; max-width: 35rem; }
.hero__actions { display: flex; flex-wrap: wrap; gap: .6rem; margin-top: 2rem; }
.profile-card { background: linear-gradient(145deg, #151b23, #0d1017); border: 1px solid var(--color-border-strong); border-radius: var(--radius-panel); padding: clamp(1.3rem, 2.5vw, 2rem); }
.profile-card__top { align-items: center; display: flex; gap: 1rem; justify-content: space-between; margin-bottom: 2.5rem; }
.profile-card__avatar { align-items: center; background: #202a2c; border: 1px solid rgba(89,255,189,.15); border-radius: 1rem; display: flex; flex-shrink: 0; font-size: 1.3rem; font-weight: 700; height: 3.6rem; justify-content: center; width: 3.6rem; }
.profile-card__avatar span { color: var(--color-accent); }
.profile-card__caption { color: var(--color-dim); font-family: var(--font-mono); font-size: .6rem; letter-spacing: .1em; line-height: 1.7; max-width: 8rem; text-align: right; }
h2 { font-size: 1.6rem; letter-spacing: -.04em; margin: 0; }
.profile-card__role { color: var(--color-muted); font-size: .88rem; margin: .5rem 0 1.8rem; }
dl { border-top: 1px solid var(--color-border); margin: 0; padding-block: .8rem; }
dl > div { padding: .65rem 0; }
dt { color: var(--color-dim); font-size: .7rem; margin-bottom: .35rem; }
dd { align-items: center; display: flex; gap: .35rem; font-size: .86rem; margin: 0; }
.profile-card__link { align-items: center; border-top: 1px solid var(--color-border); color: var(--color-secondary); display: flex; font-size: .75rem; justify-content: space-between; padding-top: 1.2rem; }
.profile-card__link:hover { color: var(--color-accent); }
.hero__stack { border-block: 1px solid var(--color-border); margin-top: clamp(3rem, 7vw, 6rem); padding-block: 1.8rem; }
.hero__stack-label { color: var(--color-dim); font-family: var(--font-mono); font-size: .6rem; letter-spacing: .12em; }
.hero__stack ul { display: flex; flex-wrap: wrap; gap: 1rem 2rem; list-style: none; margin: 1rem 0 0; padding: 0; }
.hero__stack li { color: var(--color-secondary); font-size: .9rem; font-weight: 600; }
@media (max-width: 850px) { .hero__grid { grid-template-columns: 1fr; } h1 { max-width: 16ch; } .profile-card { max-width: 34rem; width: 100%; } }
@media (max-width: 400px) { .hero__actions :deep(.button:first-child) { flex-basis: 100%; } .hero__stack ul { gap: 1rem 1.3rem; } }
</style>
