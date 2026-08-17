<script setup lang="ts">
import { Braces, Database, MapPin, ServerCog, Wrench } from '@lucide/vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = useScrollReveal<HTMLElement>()
void sectionRef
const capabilities = [
  { label: 'Full Stack Development', icon: Braces },
  { label: 'Backend & REST APIs', icon: ServerCog },
  { label: 'Database Development', icon: Database },
  { label: 'Software Maintenance', icon: Wrench },
]
const profileDetails = [
  { label: 'Location', value: 'Dominican Republic' },
  { label: 'Focus', value: 'Full Stack Development' },
  { label: 'Current Role', value: 'Development Analyst' },
]
</script>

<template>
  <section id="about" ref="sectionRef" class="about section scroll-reveal" aria-label="About Carlos Linares">
    <div class="container about__grid">
      <div class="about__copy">
        <SectionHeading eyebrow="About me" title="Building software from business requirements to production." />
        <div class="about__body">
          <p>I'm a Full Stack Developer and Development Analyst focused on building reliable, maintainable and scalable software solutions.</p>
          <p>I work across frontend, backend and databases, transforming business requirements into practical applications and continuously improving my knowledge of software architecture, APIs and modern development practices.</p>
        </div>
      </div>
      <div class="about__panel">
        <div class="capability-grid">
          <article v-for="capability in capabilities" :key="capability.label" class="capability-card">
            <component :is="capability.icon" :size="20" :stroke-width="1.7" aria-hidden="true" />
            <span>{{ capability.label }}</span>
          </article>
        </div>
        <dl class="profile-list">
          <div v-for="detail in profileDetails" :key="detail.label">
            <dt>{{ detail.label }}</dt>
            <dd><MapPin v-if="detail.label === 'Location'" :size="14" aria-hidden="true" />{{ detail.value }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about { position: relative; }
.about::after { background: rgba(89, 255, 189, 0.045); border-radius: 50%; content: ''; filter: blur(45px); height: 18rem; pointer-events: none; position: absolute; right: -9rem; top: 20%; width: 18rem; }
.about__grid { align-items: start; display: grid; gap: clamp(3rem, 8vw, 7rem); grid-template-columns: minmax(0, 1.08fr) minmax(340px, 0.92fr); }
.about__body { border-left: 1px solid var(--color-border-strong); margin-top: 2rem; padding-left: 1.5rem; }
.about__body p { color: var(--color-muted); line-height: 1.8; margin: 0; max-width: 42rem; }
.about__body p + p { margin-top: 1rem; }
.about__panel { background: linear-gradient(145deg, rgba(18, 24, 35, 0.78), rgba(11, 15, 23, 0.6)); border: 1px solid var(--color-border); border-radius: 1.2rem; padding: 1rem; }
.capability-grid { display: grid; gap: 0.65rem; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.capability-card { align-items: center; background: rgba(255, 255, 255, 0.025); border: 1px solid var(--color-border); border-radius: 0.8rem; display: flex; gap: 0.8rem; min-height: 5.6rem; padding: 1rem; }
.capability-card svg { color: var(--color-accent); flex: 0 0 auto; }
.capability-card span { color: var(--color-secondary); font-size: 0.82rem; font-weight: 650; line-height: 1.4; }
.profile-list { border-top: 1px solid var(--color-border); margin: 1rem 0 0; padding: 0.3rem 0.45rem 0; }
.profile-list > div { align-items: center; display: grid; gap: 1rem; grid-template-columns: 0.7fr 1.3fr; padding: 0.9rem 0.45rem; }
.profile-list > div + div { border-top: 1px solid var(--color-border); }
dt { color: var(--color-dim); font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.05em; text-transform: uppercase; }
dd { align-items: center; color: var(--color-secondary); display: flex; font-size: 0.78rem; font-weight: 600; gap: 0.4rem; margin: 0; }
dd svg { color: var(--color-accent); }
@media (max-width: 850px) { .about__grid { grid-template-columns: 1fr; } .about__panel { max-width: 42rem; } }
@media (max-width: 480px) { .capability-grid { grid-template-columns: 1fr; } .profile-list > div { align-items: start; grid-template-columns: 1fr; gap: 0.35rem; } }
</style>
