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
      <SectionHeading eyebrow="What I do" title="From idea to reliable software." description="End-to-end development with a practical focus on business value, maintainability and clean implementation." />
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
.services__grid { display: grid; gap: 1rem; grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 3.5rem; }
.service-card { background: linear-gradient(145deg, rgba(17, 23, 34, 0.92), rgba(11, 15, 23, 0.72)); border: 1px solid var(--color-border); border-radius: var(--radius-card); min-height: 22rem; overflow: hidden; padding: clamp(1.4rem, 3vw, 2rem); position: relative; transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease; }
.service-card::after { background: var(--color-accent); border-radius: 50%; content: ''; filter: blur(30px); height: 5rem; opacity: 0; position: absolute; right: -3rem; top: -3rem; transition: opacity 200ms ease; width: 5rem; }
.service-card:hover { border-color: rgba(89, 255, 189, 0.24); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18); transform: translateY(-4px); }
.service-card:hover::after { opacity: 0.1; }
.service-card__top { align-items: center; display: flex; justify-content: space-between; }
.service-card__icon { align-items: center; background: rgba(89, 255, 189, 0.08); border: 1px solid rgba(89, 255, 189, 0.14); border-radius: 0.75rem; color: var(--color-accent); display: flex; height: 3rem; justify-content: center; width: 3rem; }
.service-card__number { color: var(--color-dim); font-family: var(--font-mono); font-size: 0.65rem; }
h3 { font-size: clamp(1.2rem, 2vw, 1.5rem); letter-spacing: -0.035em; margin: 2.3rem 0 0; }
.service-card p { color: var(--color-muted); font-size: 0.9rem; line-height: 1.75; margin: 0.9rem 0 0; max-width: 31rem; }
ul { display: flex; flex-wrap: wrap; gap: 0.45rem; list-style: none; margin: 2rem 0 0; padding: 0; }
li { background: rgba(255, 255, 255, 0.035); border: 1px solid var(--color-border); border-radius: 999px; color: var(--color-secondary); font-family: var(--font-mono); font-size: 0.61rem; padding: 0.42rem 0.68rem; }
@media (max-width: 700px) { .services__grid { grid-template-columns: 1fr; } .service-card { min-height: auto; } }
</style>
