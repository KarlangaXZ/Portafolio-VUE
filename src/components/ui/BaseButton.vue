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
.button {
  align-items: center;
  border: 1px solid transparent;
  border-radius: 0.7rem;
  display: inline-flex;
  font-size: 0.86rem;
  font-weight: 700;
  gap: 0.55rem;
  justify-content: center;
  min-height: var(--control-height);
  padding: 0 1.15rem;
  transition: border-color 180ms ease, box-shadow 180ms ease, color 180ms ease, transform 180ms ease;
}

.button:hover { transform: translateY(-2px); }
.button:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
.button--primary { background: var(--color-accent); box-shadow: 0 10px 28px rgba(89, 255, 189, 0.14); color: #06110d; }
.button--primary:hover { box-shadow: 0 14px 34px rgba(89, 255, 189, 0.22); }
.button--secondary { background: rgba(255, 255, 255, 0.035); border-color: var(--color-border-strong); color: var(--color-text); }
.button--secondary:hover { border-color: rgba(89, 255, 189, 0.45); }
.button--ghost { color: var(--color-muted); padding-inline: 0.65rem; }
.button--ghost:hover { color: var(--color-text); }
</style>
