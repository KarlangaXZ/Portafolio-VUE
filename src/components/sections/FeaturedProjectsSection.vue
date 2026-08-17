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
    <div class="projects__glow" aria-hidden="true"></div>
    <div class="container projects__content">
      <SectionHeading eyebrow="Featured projects" title="Selected work" description="A selection of applications and experiments that showcase how I approach frontend, backend and full-stack development." />
      <div class="projects__grid">
        <ProjectCard v-for="(project, index) in featuredProjects" :key="project.slug" :project="project" :primary="index === 0" @select="selectedProject = $event" />
      </div>
    </div>
    <ProjectModal :project="selectedProject" @close="selectedProject = null" />
  </section>
</template>

<style scoped>
.projects { overflow: hidden; position: relative; }.projects__glow { background: rgba(95,106,255,.045); border-radius: 50%; filter: blur(45px); height: 35rem; pointer-events: none; position: absolute; right: -15rem; top: 15%; width: 35rem; }.projects__content { position: relative; }.projects__grid { display: grid; gap: 1rem; grid-auto-rows: minmax(18rem,auto); grid-template-columns: repeat(12,minmax(0,1fr)); margin-top: 3.5rem; }.projects__grid :deep(.project-card:nth-child(1)) { grid-column: 1/8; grid-row: 1/3; }.projects__grid :deep(.project-card:nth-child(2)),.projects__grid :deep(.project-card:nth-child(3)) { grid-column: 8/13; }.projects__grid :deep(.project-card:nth-child(4)) { grid-column: 1/5; }.projects__grid :deep(.project-card:nth-child(5)) { grid-column: 5/9; }.projects__grid :deep(.project-card:nth-child(6)) { grid-column: 9/13; }
@media (max-width: 900px) { .projects__grid { grid-template-columns: repeat(2,minmax(0,1fr)); }.projects__grid :deep(.project-card:nth-child(n)) { grid-column: auto; grid-row: auto; }.projects__grid :deep(.project-card:nth-child(1)) { grid-column: 1/-1; } }
@media (max-width: 600px) { .projects__grid { grid-template-columns: 1fr; }.projects__grid :deep(.project-card:nth-child(1)) { grid-column: auto; } }
</style>
