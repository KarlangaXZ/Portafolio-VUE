<script setup lang="ts">
import { ref } from 'vue'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import ProjectModal from '@/components/projects/ProjectModal.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { featuredProjects } from '@/data/projects'
import type { Project } from '@/types/project'

const sectionRef = useScrollReveal<HTMLElement>()
void sectionRef
const selectedProject = ref<Project | null>(null)
</script>

<template>
  <section id="projects" ref="sectionRef" class="projects section scroll-reveal" aria-label="Featured projects">
    <div class="container projects__content">
      <div class="projects__heading"><SectionHeading number="04" eyebrow="Selected work" title="Built to solve. Designed to last." /><p>A closer look at the applications, tools and experiments behind my work.<span>{{ String(featuredProjects.length).padStart(2, '0') }} SELECTED PROJECTS</span></p></div>
      <div class="projects__grid">
        <ProjectCard v-for="(project, index) in featuredProjects" :key="project.slug" :project="project" :primary="index === 0" :number="index + 1" @select="selectedProject = $event" />
      </div>
    </div>
    <ProjectModal :project="selectedProject" @close="selectedProject = null" />
  </section>
</template>

<style scoped>
.projects { border-top: 1px solid var(--color-border); }
.projects__heading { align-items: end; display: grid; gap: 3rem; grid-template-columns: minmax(0, 1.5fr) minmax(0, .6fr); }
.projects__heading > p { color: var(--color-muted); font-size: .9rem; line-height: 1.8; margin: 0 0 .4rem; }
.projects__heading > p span { color: var(--color-dim); display: block; font: .6rem var(--font-mono); letter-spacing: .12em; margin-top: 2rem; }
.projects__grid { display: grid; gap: clamp(4rem, 8vw, 8rem); margin-top: 4rem; }
@media (max-width: 760px) { .projects__heading { grid-template-columns: 1fr; gap: 1.5rem; } }
</style>
