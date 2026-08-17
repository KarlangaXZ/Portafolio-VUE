<script setup lang="ts">
import AppFooter from '@/components/layout/AppFooter.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import FeaturedProjectsSection from '@/components/sections/FeaturedProjectsSection.vue'
import GithubProjectsSection from '@/components/sections/GithubProjectsSection.vue'
import GithubStatsSection from '@/components/sections/GithubStatsSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import TechStackSection from '@/components/sections/TechStackSection.vue'
import WhatIDoSection from '@/components/sections/WhatIDoSection.vue'
import BackToTop from '@/components/ui/BackToTop.vue'
</script>

<template>
  <div class="site-shell">
    <AppNavbar />
    <main>
      <HeroSection />
      <AboutSection />
      <WhatIDoSection />
      <TechStackSection />
      <ExperienceSection />
      <FeaturedProjectsSection />
      <GithubProjectsSection />
      <GithubStatsSection />
      <ContactSection />
    </main>
    <AppFooter />
    <BackToTop />
  </div>
</template>
