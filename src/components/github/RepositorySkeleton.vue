<template>
  <div class="skeleton" aria-hidden="true">
    <span class="skeleton__icon"></span><span class="skeleton__title"></span><span class="skeleton__line"></span><span class="skeleton__line skeleton__line--short"></span><span class="skeleton__footer"></span>
  </div>
</template>

<style scoped>
.skeleton { border-bottom: 1px solid var(--color-border); min-height: 15rem; overflow: hidden; padding: 2rem 0; position: relative; }
.skeleton::after { animation: shimmer 1.5s infinite; background: linear-gradient(90deg, transparent, rgba(255,255,255,.03), transparent); content: ''; inset: 0; position: absolute; transform: translateX(-100%); }
.skeleton span { background: rgba(255,255,255,.045); border-radius: .2rem; display: block; }
.skeleton__icon { height: 1.2rem; width: 1.2rem; }
.skeleton__title { height: 1.2rem; margin-top: 1.5rem; width: 55%; }
.skeleton__line { height: .6rem; margin-top: 1rem; width: 90%; }
.skeleton__line--short { margin-top: .5rem; width: 65%; }
.skeleton__footer { height: .55rem; margin-top: 2rem; width: 75%; }
@keyframes shimmer { to { transform: translateX(100%); } }
@media (prefers-reduced-motion: reduce) { .skeleton::after { animation: none; } }
</style>
