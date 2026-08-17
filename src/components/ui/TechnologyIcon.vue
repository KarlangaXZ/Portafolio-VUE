<script setup lang="ts">
import type { SimpleIcon } from 'simple-icons'
defineProps<{ icon: SimpleIcon; title: string }>()
</script>

<template>
  <svg class="technology-icon" viewBox="0 0 24 24" role="img" :aria-label="`${title} logo`">
    <path :d="icon.path" fill="currentColor" />
  </svg>
</template>

<style scoped>
.technology-icon { display: block; height: 1.5rem; width: 1.5rem; }
</style>
