<script setup lang="ts">
import { ref } from 'vue'
import { Gamepad2 } from '@lucide/vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { games } from '@/data/games'

const sectionRef = useScrollReveal<HTMLElement>()
void sectionRef
const failedImages = ref<string[]>([])
</script>

<template>
  <section id="beyond-code" ref="sectionRef" class="beyond section scroll-reveal" aria-label="Beyond Code">
    <div class="container">
      <SectionHeading number="08" eyebrow="Away from the keyboard" title="Beyond Code" description="When I'm not coding, I'm probably gaming." />
      <h3 class="beyond__label"><Gamepad2 :size="18" aria-hidden="true" />GAMES I ENJOY</h3>
      <div class="games-grid">
        <article v-for="game in games" :key="game.slug" class="game-card" :class="`game-card--${game.slug}`" tabindex="0" :aria-label="`${game.title}, ${game.genre}, ${game.label}${game.studio ? ', ' + game.studio : ''}`">
          <img v-if="game.image && !failedImages.includes(game.slug)" class="game-card__cover" :src="game.image" alt="" width="600" height="800" loading="lazy" decoding="async" @error="failedImages.push(game.slug)" />
          <div v-else class="game-card__placeholder" aria-hidden="true"><span>{{ game.initials }}</span><Gamepad2 :size="36" :stroke-width="1" /></div>
          <div class="game-card__content">
            <span class="game-card__badge">{{ game.label }}</span>
            <h4>{{ game.title }}</h4>
            <p>{{ game.genre }}</p>
            <p v-if="game.studio" class="game-card__studio">{{ game.studio }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.beyond { border-top: 1px solid var(--color-border); }
.beyond__label { align-items: center; color: var(--color-dim); display: flex; font: .65rem var(--font-mono); gap: .7rem; letter-spacing: .1em; margin: 3.5rem 0 1.5rem; }
.games-grid { display: grid; gap: 1.2rem; grid-template-columns: repeat(4, minmax(0, 1fr)); }
.game-card { --cover-tone: #33374c; aspect-ratio: 2/3; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: .6rem; isolation: isolate; overflow: hidden; position: relative; transition: border-color 220ms ease; }
.game-card--diablo-iv { --cover-tone: #423036; }
.game-card--apex-legends { --cover-tone: #303c4b; }
.game-card--forza-horizon { --cover-tone: #30433e; }
.game-card:nth-child(2n) { margin-top: 2rem; transform: translateY(0); }
.game-card::after { background: linear-gradient(180deg, transparent 5%, rgba(9,11,16,.2) 35%, #090b10 100%); content: ''; inset: 0; position: absolute; z-index: -1; }
.game-card__cover, .game-card__placeholder { height: 100%; inset: 0; object-fit: cover; position: absolute; transition: transform 350ms ease; width: 100%; z-index: -2; }
.game-card__placeholder { align-items: center; background: linear-gradient(145deg, var(--cover-tone), #10131a); display: flex; flex-direction: column; gap: 1.2rem; padding-top: 4rem; }
.game-card__placeholder > span { color: rgba(255,255,255,.3); font-size: clamp(3rem, 5vw, 5rem); font-weight: 500; letter-spacing: -.08em; }
.game-card__placeholder svg { color: rgba(255,255,255,.18); }
.game-card__content { bottom: 0; left: 0; padding: clamp(1rem, 2vw, 1.5rem); position: absolute; right: 0; }
.game-card__badge { color: #c4cbd6; display: block; font: .55rem var(--font-mono); letter-spacing: .08em; text-transform: uppercase; }
h4 { font-size: clamp(1.25rem, 2vw, 1.8rem); font-weight: 500; letter-spacing: -.04em; line-height: 1.15; margin: .9rem 0 .6rem; }
.game-card__content p { color: var(--color-muted); font-size: .7rem; line-height: 1.6; margin: 0; }
.game-card__content .game-card__studio { font-size: .6rem; margin-top: .65rem; }
.game-card:hover, .game-card:focus-visible { border-color: rgba(89,255,189,.35); }
.game-card:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 4px; }
.game-card:hover .game-card__cover, .game-card:focus-visible .game-card__cover, .game-card:hover .game-card__placeholder { transform: scale(1.035); }
@media (hover: hover) and (prefers-reduced-motion: no-preference) { .game-card__studio { opacity: 0; transform: translateY(5px); transition: opacity 200ms ease, transform 200ms ease; } .game-card:hover .game-card__studio, .game-card:focus-visible .game-card__studio { opacity: 1; transform: none; } }
@media (max-width: 1000px) { .games-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .game-card { aspect-ratio: 4/5; min-height: 20rem; } .game-card:nth-child(2n) { margin-top: 0; } }
@media (max-width: 540px) { .games-grid { grid-template-columns: 1fr; } .game-card { aspect-ratio: 1; } }
@media (prefers-reduced-motion: reduce) { .game-card:hover .game-card__cover, .game-card:focus-visible .game-card__cover, .game-card:hover .game-card__placeholder { transform: none; } }
</style>
