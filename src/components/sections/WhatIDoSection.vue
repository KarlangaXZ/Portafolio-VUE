<script setup lang="ts">
import { Braces, Database, PlugZap, ServerCog } from '@lucide/vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = useScrollReveal<HTMLElement>()
void sectionRef
const services = [
  { icon: Braces, number: '01', title: 'Full Stack Development', description: 'Building complete applications from responsive user interfaces to backend services and databases.', technologies: ['Vue.js', 'React', 'TypeScript', '.NET'] },
  { icon: ServerCog, number: '02', title: 'Backend Development', description: 'Developing business logic, REST APIs and maintainable backend services.', technologies: ['C#', '.NET', 'Python', 'FastAPI'] },
  { icon: Database, number: '03', title: 'Database Development', description: 'Designing queries, data models and database logic for business applications.', technologies: ['Oracle', 'PL/SQL', 'SQL', 'Entity Framework Core'] },
  { icon: PlugZap, number: '04', title: 'Software Integration & Maintenance', description: 'Integrating APIs, maintaining existing systems, debugging issues and improving business applications.', technologies: ['REST APIs', 'Git', 'GitHub', 'Bitbucket'] },
]
</script>

<template>
  <section id="services" ref="sectionRef" class="services section section--surface scroll-reveal" aria-label="What I do">
    <div class="container">
      <SectionHeading number="02" eyebrow="What I do" title="From idea to reliable software." description="End-to-end development with a practical focus on business value, maintainability and clean implementation." />
      <div class="services__grid">
        <article v-for="service in services" :key="service.title" class="service-card">
          <div class="service-card__top">
            <span class="service-card__icon"><component :is="service.icon" :size="24" :stroke-width="1.6" aria-hidden="true" /></span>
            <span class="service-card__number">{{ service.number }}</span>
          </div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
          <ul :aria-label="`${service.title} technologies`">
            <li v-for="technology in service.technologies" :key="technology">{{ technology }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services__grid { border-top: 1px solid var(--color-border); margin-top: 4rem; }
.service-card { align-items: start; border-bottom: 1px solid var(--color-border); display: grid; gap: 1rem 2rem; grid-template-columns: 3rem minmax(0, 1fr) minmax(0, .9fr); padding: 2.5rem 0; }
.service-card__top { align-items: center; display: flex; flex-direction: column; gap: .9rem; }
.service-card__icon { color: var(--color-muted); }
.service-card__number { color: var(--color-dim); font: .6rem var(--font-mono); }
h3 { font-size: clamp(1.4rem, 2.5vw, 2.3rem); font-weight: 500; letter-spacing: -.04em; margin: 0; max-width: 18ch; }
.service-card p { color: var(--color-muted); font-size: .9rem; line-height: 1.8; margin: 0; }
ul { display: flex; flex-wrap: wrap; gap: .5rem 1rem; grid-column: 3; list-style: none; margin: 0; padding: 0; }
li { color: var(--color-dim); font: .6rem/1.7 var(--font-mono); }
@media (max-width: 700px) { .service-card { grid-template-columns: 2rem minmax(0, 1fr); gap: 1rem; } .service-card p, ul { grid-column: 2; } }
</style>
