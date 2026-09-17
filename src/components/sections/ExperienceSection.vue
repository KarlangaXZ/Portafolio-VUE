<script setup lang="ts">
import { Building2, Check, MapPin } from '@lucide/vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { professionalExperience } from '@/data/experience'

const sectionRef = useScrollReveal<HTMLElement>()
void sectionRef
</script>

<template>
  <section id="experience" ref="sectionRef" class="experience section section--surface scroll-reveal" aria-label="Professional experience">
    <div class="container">
      <SectionHeading number="03" eyebrow="Professional experience" title="Full stack. Real-world experience." description="Hands-on experience across application layers, from user interfaces and business logic to enterprise database development." />

      <div class="timeline">
        <article v-for="item in professionalExperience" :key="`${item.company}-${item.role}`" class="timeline__item">
          <p class="experience-card__period">{{ item.period }}</p>
          <div class="timeline__rail" aria-hidden="true"><span></span></div>
          <div class="experience-card">
            <header class="experience-card__header">
              <div>
                <h3>{{ item.role }}</h3>
                <p class="experience-card__company"><Building2 :size="16" aria-hidden="true" />{{ item.company }}</p>
              </div>
              <p class="experience-card__location"><MapPin :size="15" aria-hidden="true" />{{ item.location }}</p>
            </header>

            <p class="experience-card__description">{{ item.description }}</p>

            <div class="experience-card__body">
              <div>
                <h4>Frontend, backend & databases</h4>
                <ul>
                  <li v-for="responsibility in item.responsibilities" :key="responsibility"><Check :size="14" aria-hidden="true" /><span>{{ responsibility }}</span></li>
                </ul>
              </div>
              <aside>
                <h4>Core stack</h4>
                <div class="technology-list">
                  <span v-for="technology in item.technologies" :key="technology">{{ technology }}</span>
                </div>
              </aside>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline { margin-top: 5rem; }
.timeline__item { display: grid; gap: clamp(1rem, 3vw, 3rem); grid-template-columns: minmax(6rem, .22fr) 1px minmax(0, 1fr); }
.experience-card__period { color: var(--color-accent); font: .8rem var(--font-mono); letter-spacing: .06em; margin: .6rem 0 0; text-transform: uppercase; }
.timeline__rail { background: var(--color-border-strong); position: relative; }
.timeline__rail span { background: var(--color-accent); border: 5px solid var(--color-bg); border-radius: 50%; height: 17px; left: -8px; position: absolute; top: .5rem; width: 17px; }
.experience-card { min-width: 0; padding-bottom: 4rem; }
.experience-card__header { align-items: start; display: flex; flex-wrap: wrap; gap: 1rem 2rem; justify-content: space-between; }
h3 { font-size: clamp(1.8rem, 3.4vw, 3.25rem); font-weight: 500; letter-spacing: -.045em; margin: 0; }
.experience-card__company, .experience-card__location { align-items: center; color: var(--color-secondary); display: flex; font-size: .85rem; gap: .5rem; margin: .9rem 0 0; }
.experience-card__location { color: var(--color-muted); font-size: .75rem; }
.experience-card__description { color: var(--color-muted); font-size: 1.08rem; line-height: 1.8; margin: 2rem 0; max-width: 42rem; }
.experience-card__body { border-top: 1px solid var(--color-border); display: grid; gap: 2.5rem; grid-template-columns: minmax(0, 1fr) minmax(180px, .45fr); padding-top: 2rem; }
h4 { color: var(--color-dim); font: .65rem var(--font-mono); letter-spacing: .07em; line-height: 1.7; margin: 0 0 1.5rem; text-transform: uppercase; }
ul { display: grid; gap: 1rem; list-style: none; margin: 0; padding: 0; }
li { align-items: start; color: var(--color-secondary); display: flex; font-size: .87rem; gap: .8rem; line-height: 1.7; }
li svg { color: var(--color-dim); flex-shrink: 0; margin-top: .35rem; }
.technology-list { display: flex; flex-wrap: wrap; gap: .5rem; }
.technology-list span { border: 1px solid var(--color-border-strong); border-radius: 999px; color: var(--color-secondary); font: .65rem var(--font-mono); padding: .55rem .75rem; }
@media (max-width: 900px) { .experience-card__body { grid-template-columns: 1fr; } }
@media (max-width: 600px) { .timeline { margin-top: 3rem; } .timeline__item { gap: 0 1.4rem; grid-template-columns: 1px minmax(0, 1fr); } .timeline__rail { grid-column: 1; grid-row: 1/3; } .experience-card__period { grid-column: 2; margin: 0 0 1.5rem; } .experience-card { grid-column: 2; } }
</style>
