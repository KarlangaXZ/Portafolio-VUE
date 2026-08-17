<template>
  <div class="skeleton" aria-hidden="true">
    <span class="skeleton__icon"></span><span class="skeleton__title"></span><span class="skeleton__line"></span><span class="skeleton__line skeleton__line--short"></span><span class="skeleton__footer"></span>
  </div>
</template>

<style scoped>
.skeleton { background: rgba(13,18,28,.65); border: 1px solid var(--color-border); border-radius: .9rem; min-height: 15rem; overflow: hidden; padding: 1.25rem; position: relative; }.skeleton::after { animation: shimmer 1.5s infinite; background: linear-gradient(90deg,transparent,rgba(255,255,255,.035),transparent); content: ''; inset: 0; position: absolute; transform: translateX(-100%); }.skeleton span { background: rgba(255,255,255,.045); border-radius: .3rem; display: block; }.skeleton__icon { height: 2.35rem; width: 2.35rem; }.skeleton__title { height: .9rem; margin-top: 1.35rem; width: 55%; }.skeleton__line { height: .55rem; margin-top: .8rem; width: 90%; }.skeleton__line--short { margin-top: .45rem; width: 65%; }.skeleton__footer { height: .55rem; margin-top: 4rem; width: 75%; }@keyframes shimmer { to { transform: translateX(100%); } }@media (prefers-reduced-motion: reduce) { .skeleton::after { animation: none; } }
</style>
