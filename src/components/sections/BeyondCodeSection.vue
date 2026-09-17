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
      <SectionHeading eyebrow="Away from the keyboard" title="Beyond Code" description="When I'm not coding, I'm probably gaming." />
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
.beyond { background: linear-gradient(180deg, rgba(83,76,122,.045), transparent); border-top: 1px solid var(--color-border); }
.beyond__label { align-items: center; color: var(--color-muted); display: flex; font-family: var(--font-mono); font-size: .68rem; font-weight: 400; gap: .7rem; letter-spacing: .12em; margin: 3rem 0 1.25rem; }
.games-grid { display: grid; gap: 1rem; grid-template-columns: repeat(4, minmax(0, 1fr)); }
.game-card { --cover-tone: #33334b; aspect-ratio: 3/4; background: var(--color-surface); border: 1px solid var(--color-border-strong); border-radius: var(--radius-card); isolation: isolate; overflow: hidden; position: relative; transition: border-color 200ms ease; }
.game-card--diablo-iv { --cover-tone: #493039; }
.game-card--apex-legends { --cover-tone: #343e4f; }
.game-card--forza-horizon { --cover-tone: #304446; }
.game-card::after { background: linear-gradient(180deg, transparent 15%, rgba(9,11,16,.45) 40%, #090b10 100%); content: ''; inset: 0; position: absolute; z-index: -1; }
.game-card__cover, .game-card__placeholder { height: 100%; inset: 0; object-fit: cover; position: absolute; transition: transform 350ms ease; width: 100%; z-index: -2; }
.game-card__placeholder { align-items: center; background: radial-gradient(ellipse at 65% 15%, var(--cover-tone), #11151e 75%); display: flex; flex-direction: column; gap: 1rem; padding-top: 3rem; }
.game-card__placeholder > span { color: rgba(255,255,255,.2); font-size: clamp(2.5rem, 4vw, 4rem); font-weight: 800; letter-spacing: -.06em; }
.game-card__placeholder svg { color: rgba(255,255,255,.18); }
.game-card__content { bottom: 0; left: 0; padding: 1.3rem; position: absolute; right: 0; }
.game-card__badge { background: rgba(255,255,255,.05); border: 1px solid var(--color-border-strong); border-radius: 999px; color: var(--color-secondary); display: inline-block; font-size: .6rem; padding: .35rem .6rem; }
h4 { font-size: clamp(1.2rem, 1.7vw, 1.5rem); letter-spacing: -.04em; line-height: 1.15; margin: .9rem 0 .5rem; }
.game-card__content p { color: var(--color-muted); font-size: .73rem; line-height: 1.5; margin: 0; }
.game-card__content .game-card__studio { font-size: .65rem; margin-top: .5rem; }
.game-card:hover, .game-card:focus-visible { border-color: rgba(89,255,189,.35); }
.game-card:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 4px; }
.game-card:hover .game-card__cover, .game-card:focus-visible .game-card__cover, .game-card:hover .game-card__placeholder { transform: scale(1.035); }
@media (hover: hover) and (prefers-reduced-motion: no-preference) { .game-card__studio { opacity: 0; transform: translateY(5px); transition: opacity 200ms ease, transform 200ms ease; } .game-card:hover .game-card__studio, .game-card:focus-visible .game-card__studio { opacity: 1; transform: none; } }
@media (max-width: 1100px) { .games-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .game-card { aspect-ratio: 4/3; min-height: 20rem; } }
@media (max-width: 540px) { .games-grid { grid-template-columns: 1fr; } .game-card { aspect-ratio: 1; } }
@media (prefers-reduced-motion: reduce) { .game-card:hover .game-card__cover, .game-card:focus-visible .game-card__cover, .game-card:hover .game-card__placeholder { transform: none; } }
</style>
