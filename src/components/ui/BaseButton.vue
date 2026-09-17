<script setup lang="ts">
import type { Component } from 'vue'

withDefaults(
  defineProps<{
    href: string
    variant?: 'primary' | 'secondary' | 'ghost'
    external?: boolean
    icon?: Component
  }>(),
  { variant: 'primary', external: false, icon: undefined },
)
</script>

<template>
  <a
    class="button"
    :class="`button--${variant}`"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
  >
    <slot />
    <component :is="icon" v-if="icon" :size="17" :stroke-width="1.8" aria-hidden="true" />
  </a>
</template>

<style scoped>
.button { align-items: center; border: 1px solid transparent; border-radius: 999px; display: inline-flex; font-size: .8rem; font-weight: 600; gap: .7rem; justify-content: center; min-height: 3.25rem; padding: .7rem 1.3rem; transition: background 180ms ease, border-color 180ms ease, color 180ms ease; }
.button svg { flex-shrink: 0; }
.button--primary { background: var(--color-accent); color: #090b10; }
.button--primary:hover { background: #a0ffda; }
.button--secondary { background: transparent; border-color: var(--color-border-strong); color: var(--color-text); }
.button--secondary:hover { background: rgba(255,255,255,.05); border-color: var(--color-muted); }
.button--ghost { color: var(--color-secondary); padding-inline: .8rem; }
.button--ghost:hover { color: var(--color-accent); }
</style>
