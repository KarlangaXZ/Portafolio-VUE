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
      <SectionHeading eyebrow="Professional experience" title="Building and maintaining business software." description="Hands-on experience across application layers, from user interfaces and business logic to enterprise database development." />

      <div class="timeline">
        <article v-for="item in professionalExperience" :key="`${item.company}-${item.role}`" class="timeline__item">
          <div class="timeline__rail" aria-hidden="true"><span></span></div>
          <div class="experience-card">
            <header class="experience-card__header">
              <div>
                <p class="experience-card__period">{{ item.period }}</p>
                <h3>{{ item.role }}</h3>
                <p class="experience-card__company"><Building2 :size="16" aria-hidden="true" />{{ item.company }}</p>
              </div>
              <p class="experience-card__location"><MapPin :size="15" aria-hidden="true" />{{ item.location }}</p>
            </header>

            <p class="experience-card__description">{{ item.description }}</p>

            <div class="experience-card__body">
              <div>
                <h4>Key responsibilities</h4>
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
.timeline { margin-top: 4rem; }
.timeline__item { display: grid; gap: clamp(1rem, 3vw, 2rem); grid-template-columns: 1.5rem minmax(0, 1fr); position: relative; }
.timeline__rail { display: flex; justify-content: center; position: relative; }
.timeline__rail::after { background: linear-gradient(var(--color-accent), rgba(89, 255, 189, 0.04)); content: ''; inset: 1.2rem auto -4rem; position: absolute; width: 1px; }
.timeline__rail span { background: var(--color-bg); border: 2px solid var(--color-accent); border-radius: 50%; box-shadow: 0 0 0 7px rgba(89, 255, 189, 0.07), 0 0 18px rgba(89, 255, 189, 0.22); height: 0.75rem; margin-top: 1rem; position: relative; width: 0.75rem; z-index: 1; }
.experience-card { background: linear-gradient(145deg, rgba(17, 23, 34, 0.96), rgba(9, 13, 21, 0.78)); border: 1px solid var(--color-border); border-radius: var(--radius-panel); box-shadow: 0 24px 60px rgba(0, 0, 0, 0.16); overflow: hidden; padding: clamp(1.4rem, 4vw, 2.5rem); }
.experience-card__header { align-items: flex-start; display: flex; gap: 2rem; justify-content: space-between; }
.experience-card__period { color: var(--color-accent); font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.1em; margin: 0 0 0.7rem; text-transform: uppercase; }
h3 { font-size: clamp(1.65rem, 3.5vw, 2.5rem); letter-spacing: -0.045em; margin: 0; }
.experience-card__company, .experience-card__location { align-items: center; color: var(--color-secondary); display: flex; font-size: 0.82rem; gap: 0.5rem; margin: 0.75rem 0 0; }
.experience-card__company svg, .experience-card__location svg { color: var(--color-accent); }
.experience-card__location { color: var(--color-muted); flex: 0 0 auto; margin-top: 0.2rem; }
.experience-card__description { border-bottom: 1px solid var(--color-border); color: var(--color-muted); font-size: 1rem; line-height: 1.75; margin: 2rem 0 0; padding-bottom: 2rem; }
.experience-card__body { display: grid; gap: clamp(2rem, 6vw, 5rem); grid-template-columns: minmax(0, 1.4fr) minmax(230px, 0.6fr); padding-top: 2rem; }
h4 { color: var(--color-dim); font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.08em; margin: 0 0 1.2rem; text-transform: uppercase; }
ul { display: grid; gap: 0.8rem; list-style: none; margin: 0; padding: 0; }
li { align-items: flex-start; color: var(--color-secondary); display: flex; font-size: 0.82rem; gap: 0.65rem; line-height: 1.55; }
li svg { color: var(--color-accent); flex: 0 0 auto; margin-top: 0.2rem; }
.technology-list { display: flex; flex-wrap: wrap; gap: 0.45rem; }
.technology-list span { background: rgba(255, 255, 255, 0.035); border: 1px solid var(--color-border); border-radius: 999px; color: var(--color-secondary); font-family: var(--font-mono); font-size: 0.6rem; padding: 0.45rem 0.65rem; }
@media (max-width: 720px) { .experience-card__body { grid-template-columns: 1fr; } .experience-card__header { flex-direction: column; gap: 0.5rem; } .experience-card__location { margin-top: 0; } }
@media (max-width: 480px) { .timeline__item { grid-template-columns: 0.8rem minmax(0, 1fr); } .timeline__rail span { height: 0.6rem; width: 0.6rem; } }
</style>
