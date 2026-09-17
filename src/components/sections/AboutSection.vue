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
      <SectionHeading number="01" eyebrow="About me" title="The person behind the code." />
      <div class="about__body">
        <p class="about__lead">I'm Carlos. I turn business requirements into software people can rely on.</p>
        <p>Full Stack Developer and Development Analyst working with Vue.js, JavaScript, C# and .NET, backed by Oracle and SQL.</p>
        <p>I keep exploring software architecture and new technologies. Away from the keyboard, there's usually a game in progress.</p>
        <a href="#beyond-code">Beyond the work <span aria-hidden="true">&nearr;</span></a>
      </div>
      <dl class="profile-list">
        <div v-for="detail in profileDetails" :key="detail.label"><dt>{{ detail.label }}</dt><dd><MapPin v-if="detail.label === 'Location'" :size="14" aria-hidden="true" />{{ detail.value }}</dd></div>
      </dl>
      <div class="capability-grid">
        <article v-for="capability in capabilities" :key="capability.label" class="capability-card"><component :is="capability.icon" :size="18" :stroke-width="1.5" aria-hidden="true" /><span>{{ capability.label }}</span></article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about__grid { display: grid; gap: 4rem clamp(3rem, 9vw, 9rem); grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); }
.about__body { padding-top: 3rem; }
.about__body p { color: var(--color-muted); font-size: .95rem; line-height: 1.9; margin: 0 0 1.3rem; }
.about__body .about__lead { color: var(--color-text); font-size: clamp(1.4rem, 2.1vw, 1.9rem); letter-spacing: -.03em; line-height: 1.5; }
.about__body a { align-items: center; border-bottom: 1px solid var(--color-border-strong); display: inline-flex; font-size: .8rem; gap: 2rem; padding-block: .7rem; }
.about__body a:hover { color: var(--color-accent); }
.profile-list { border-top: 1px solid var(--color-border); margin: 0; padding-top: 1rem; }
.profile-list > div { display: flex; flex-wrap: wrap; gap: .5rem 1rem; justify-content: space-between; padding: .8rem 0; }
dt { color: var(--color-dim); font: .65rem var(--font-mono); text-transform: uppercase; }
dd { align-items: center; color: var(--color-secondary); display: flex; font-size: .8rem; gap: .4rem; margin: 0; }
.capability-grid { align-self: start; border-top: 1px solid var(--color-border); display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; padding-top: 1.8rem; }
.capability-card { align-items: start; color: var(--color-secondary); display: flex; font-size: .75rem; gap: .75rem; line-height: 1.6; }
.capability-card svg { color: var(--color-dim); flex-shrink: 0; margin-top: .1rem; }
@media (max-width: 760px) { .about__grid { grid-template-columns: 1fr; gap: 2.5rem; } .about__body { padding-top: 0; } }
@media (max-width: 380px) { .capability-grid { grid-template-columns: 1fr; } }
</style>
