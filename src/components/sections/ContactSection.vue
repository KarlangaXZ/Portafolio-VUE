<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ArrowDownRight, BriefcaseBusiness, GitFork, MapPin } from '@lucide/vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

interface ContactForm { name: string; email: string; message: string }
interface ContactErrors { name?: string; email?: string; message?: string }

const sectionRef = useScrollReveal<HTMLElement>()
void sectionRef
const form = reactive<ContactForm>({ name: '', email: '', message: '' })
const errors = reactive<ContactErrors>({})
const showNotice = ref(false)

function validate(): boolean {
  errors.name = form.name.trim() ? undefined : 'Please enter your name.'
  errors.email = !form.email.trim()
    ? 'Please enter your email.'
    : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
      ? undefined
      : 'Please enter a valid email address.'
  errors.message = !form.message.trim()
    ? 'Please enter a message.'
    : form.message.trim().length >= 20
      ? undefined
      : 'Please include at least 20 characters.'
  return !errors.name && !errors.email && !errors.message
}

function handleSubmit(): void {
  showNotice.value = false
  if (validate()) showNotice.value = true
}
</script>

<template>
  <section id="contact" ref="sectionRef" class="contact section section--surface scroll-reveal" aria-label="Contact Carlos Linares">
    <div class="contact__glow" aria-hidden="true"></div>
    <div class="container contact__content">
      <SectionHeading eyebrow="Contact" title="Let's build something together" description="I'm always interested in discussing software development, new opportunities and interesting projects. Feel free to reach out or explore my work." />

      <div class="contact__grid">
        <div class="contact__details">
          <h3>Have a project or opportunity in mind?</h3>
          <p>Whether it's a development opportunity, collaboration or an interesting technical challenge, I'd be happy to hear about it.</p>
          <dl>
            <div><dt><MapPin :size="16" aria-hidden="true" />Location</dt><dd>Dominican Republic</dd></div>
            <div><dt><span class="availability-dot"></span>Availability</dt><dd>Open to opportunities</dd></div>
            <div><dt><GitFork :size="16" aria-hidden="true" />GitHub</dt><dd>KarlangaXZ</dd></div>
            <div><dt><BriefcaseBusiness :size="16" aria-hidden="true" />LinkedIn</dt><dd>Carlos Linares</dd></div>
          </dl>
          <div class="contact__actions">
            <BaseButton href="https://linkedin.com/in/carlosjlinares/" external :icon="BriefcaseBusiness" aria-label="Open Carlos Linares on LinkedIn">LinkedIn</BaseButton>
            <BaseButton href="https://github.com/KarlangaXZ" variant="secondary" external :icon="GitFork" aria-label="Open Carlos Linares on GitHub">GitHub</BaseButton>
            <BaseButton href="#projects" variant="ghost" :icon="ArrowDownRight">View my work</BaseButton>
          </div>
        </div>

        <form class="contact-form" novalidate @submit.prevent="handleSubmit">
          <header class="contact-form__header"><span>Message form preview</span><p>Direct sending is not active yet. LinkedIn is the available contact channel.</p></header>
          <div class="field">
            <label for="contact-name">Name</label>
            <input id="contact-name" v-model="form.name" name="name" type="text" autocomplete="name" placeholder="Your name" required :aria-invalid="Boolean(errors.name)" :aria-describedby="errors.name ? 'contact-name-error' : undefined" @input="errors.name = undefined" />
            <span v-if="errors.name" id="contact-name-error" class="field__error" role="alert">{{ errors.name }}</span>
          </div>
          <div class="field">
            <label for="contact-email">Email</label>
            <input id="contact-email" v-model="form.email" name="email" type="email" autocomplete="email" inputmode="email" placeholder="you@example.com" required :aria-invalid="Boolean(errors.email)" :aria-describedby="errors.email ? 'contact-email-error' : undefined" @input="errors.email = undefined" />
            <span v-if="errors.email" id="contact-email-error" class="field__error" role="alert">{{ errors.email }}</span>
          </div>
          <div class="field">
            <label for="contact-message">Message</label>
            <textarea id="contact-message" v-model="form.message" name="message" rows="6" placeholder="Tell me about your project or opportunity..." required :aria-invalid="Boolean(errors.message)" :aria-describedby="errors.message ? 'contact-message-error' : undefined" @input="errors.message = undefined"></textarea>
            <span v-if="errors.message" id="contact-message-error" class="field__error" role="alert">{{ errors.message }}</span>
          </div>
          <button class="submit-button" type="submit">Send message<ArrowDownRight :size="17" aria-hidden="true" /></button>
          <div v-if="showNotice" class="contact-form__notice" role="status">
            <p>Direct messaging is being prepared. For now, you can reach me through LinkedIn.</p>
            <a href="https://linkedin.com/in/carlosjlinares/" target="_blank" rel="noopener noreferrer" aria-label="Contact Carlos Linares through LinkedIn">Open LinkedIn<BriefcaseBusiness :size="15" aria-hidden="true" /></a>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact { overflow: hidden; position: relative; }.contact__glow { background: rgba(89,255,189,.05); border-radius: 50%; bottom: -12rem; filter: blur(50px); height: 32rem; pointer-events: none; position: absolute; right: -10rem; width: 32rem; }.contact__content { position: relative; }.contact__grid { align-items: start; display: grid; gap: clamp(2.5rem,7vw,6rem); grid-template-columns: minmax(0,.9fr) minmax(360px,1.1fr); margin-top: 4rem; }.contact__details h3 { font-size: clamp(1.45rem,3vw,2.1rem); letter-spacing: -.04em; margin: 0; max-width: 20ch; }.contact__details > p { color: var(--color-muted); font-size: .88rem; line-height: 1.75; margin: 1rem 0 0; max-width: 34rem; }.contact__details dl { border-bottom: 1px solid var(--color-border); border-top: 1px solid var(--color-border); margin: 2rem 0 0; }.contact__details dl > div { align-items: center; display: grid; gap: 1rem; grid-template-columns: .75fr 1.25fr; padding: .9rem .2rem; }.contact__details dl > div + div { border-top: 1px solid var(--color-border); }.contact__details dt { align-items: center; color: var(--color-dim); display: flex; font-family: var(--font-mono); font-size: .6rem; gap: .55rem; text-transform: uppercase; }.contact__details dt svg { color: var(--color-accent); }.contact__details dd { color: var(--color-secondary); font-size: .75rem; font-weight: 600; margin: 0; }.availability-dot { background: var(--color-accent); border-radius: 50%; box-shadow: 0 0 8px rgba(89,255,189,.45); height: 6px; margin-inline: .3rem; width: 6px; }.contact__actions { display: flex; flex-wrap: wrap; gap: .45rem; margin-top: 1.5rem; }.contact-form { background: linear-gradient(145deg,rgba(17,23,34,.96),rgba(9,13,21,.82)); border: 1px solid var(--color-border); border-radius: 1.1rem; box-shadow: 0 28px 70px rgba(0,0,0,.18); display: grid; gap: 1.2rem; padding: clamp(1.3rem,4vw,2.2rem); }.contact-form__header { border-bottom: 1px solid var(--color-border); padding-bottom: 1rem; } .contact-form__header span { color: var(--color-accent); font-family: var(--font-mono); font-size: .62rem; letter-spacing: .08em; text-transform: uppercase; } .contact-form__header p { color: var(--color-muted); font-size: .7rem; line-height: 1.55; margin: .45rem 0 0; } .field { display: grid; gap: .5rem; }.field label { color: var(--color-secondary); font-size: .7rem; font-weight: 650; }.field input,.field textarea { background: rgba(255,255,255,.025); border: 1px solid var(--color-border); border-radius: var(--radius-control); color: var(--color-text); font: .78rem var(--font-sans); outline: none; padding: .85rem .9rem; transition: border-color 160ms ease,box-shadow 160ms ease; width: 100%; }.field input { min-height: 3rem; }.field textarea { line-height: 1.6; min-height: 9rem; resize: vertical; }.field input::placeholder,.field textarea::placeholder { color: var(--color-dim); }.field input:focus,.field textarea:focus { border-color: rgba(89,255,189,.38); box-shadow: 0 0 0 3px rgba(89,255,189,.055); }.field input[aria-invalid="true"],.field textarea[aria-invalid="true"] { border-color: rgba(255,115,115,.5); }.field__error { color: #f19a9a; font-size: .64rem; }.submit-button { align-items: center; background: rgba(89,255,189,.07); border: 1px solid rgba(89,255,189,.24); border-radius: var(--radius-control); color: var(--color-accent); cursor: pointer; display: flex; font-size: .76rem; font-weight: 750; gap: .5rem; justify-content: center; min-height: 3rem; transition: box-shadow 180ms ease,transform 180ms ease; }.submit-button:hover { border-color: rgba(89,255,189,.42); box-shadow: 0 12px 30px rgba(89,255,189,.15); transform: translateY(-2px); }.contact-form__notice { background: rgba(89,255,189,.055); border: 1px solid rgba(89,255,189,.16); border-radius: var(--radius-control); padding: .9rem; }.contact-form__notice p { color: var(--color-secondary); font-size: .7rem; line-height: 1.55; margin: 0; }.contact-form__notice a { align-items: center; color: var(--color-accent); display: inline-flex; font-size: .68rem; font-weight: 700; gap: .4rem; margin-top: .65rem; }
@media (max-width: 800px) { .contact__grid { grid-template-columns: 1fr; }.contact-form { max-width: 42rem; } }
@media (max-width: 460px) { .contact__details dl > div { align-items: start; grid-template-columns: 1fr; gap: .35rem; }.contact__actions :deep(.button) { flex: 1 1 calc(50% - .5rem); }.contact__actions :deep(.button:last-child) { flex-basis: 100%; } }
@media (prefers-reduced-motion: reduce) { .submit-button:hover { transform: none; } }
</style>
