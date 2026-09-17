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
    <div class="container contact__content">
      <SectionHeading number="09" eyebrow="Start a conversation" title="Let's build something." />

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
          <button class="submit-button" type="submit">Preview message<ArrowDownRight :size="17" aria-hidden="true" /></button>
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
.contact { background: var(--color-surface); }
.contact :deep(.section-heading) { max-width: 70rem; }
.contact :deep(h2) { font-size: clamp(3.7rem, 10vw, 9.5rem); font-weight: 500; letter-spacing: -.075em; line-height: 1; max-width: 11ch; }
.contact__grid { align-items: start; display: grid; gap: clamp(3rem, 9vw, 9rem); grid-template-columns: minmax(0, 1fr) minmax(0, .85fr); margin-top: 5rem; }
.contact__details { display: flex; flex-direction: column; }
.contact__details h3 { font-size: clamp(1.3rem, 2vw, 1.8rem); font-weight: 500; letter-spacing: -.03em; margin: 0; max-width: 24ch; }
.contact__details > p { color: var(--color-muted); font-size: .92rem; line-height: 1.9; margin: 1.2rem 0 0; max-width: 30rem; }
.contact__details dl { border-top: 1px solid var(--color-border); margin: 3rem 0 0; order: 1; padding-top: 1rem; }
.contact__details dl > div { align-items: center; display: flex; flex-wrap: wrap; gap: .5rem 1rem; justify-content: space-between; padding: .9rem 0; }
.contact__details dt { align-items: center; color: var(--color-dim); display: flex; font: .65rem var(--font-mono); gap: .6rem; text-transform: uppercase; }
.contact__details dd { color: var(--color-secondary); font-size: .8rem; margin: 0; }
.availability-dot { background: var(--color-accent); border-radius: 50%; height: 6px; margin-inline: .3rem; width: 6px; }
.contact__actions { display: flex; flex-wrap: wrap; gap: .7rem; margin-top: 2rem; }
.contact-form { display: grid; gap: 1.7rem; }
.contact-form__header span { color: var(--color-secondary); font: .65rem var(--font-mono); letter-spacing: .1em; text-transform: uppercase; }
.contact-form__header p { color: var(--color-muted); font-size: .75rem; line-height: 1.8; margin: .75rem 0 0; }
.field { display: grid; gap: .65rem; }
.field label { color: var(--color-secondary); font-size: .75rem; }
.field input, .field textarea { background: transparent; border: 0; border-bottom: 1px solid var(--color-border-strong); border-radius: 0; color: var(--color-text); font: 1rem var(--font-sans); min-width: 0; padding: .8rem 0; transition: border-color 180ms ease; width: 100%; }
.field input { min-height: 3rem; }
.field textarea { line-height: 1.7; min-height: 8rem; resize: vertical; }
.field input::placeholder, .field textarea::placeholder { color: var(--color-dim); }
.field input:focus, .field textarea:focus { border-color: var(--color-accent); }
.field input[aria-invalid="true"], .field textarea[aria-invalid="true"] { border-color: #f19a9a; }
.field__error { color: #f19a9a; font-size: .7rem; }
.submit-button { align-items: center; background: var(--color-text); border: 0; border-radius: 999px; color: var(--color-bg); cursor: pointer; display: flex; font-size: .8rem; gap: 2rem; justify-content: space-between; justify-self: start; min-height: 3.1rem; padding: .75rem 1.5rem; transition: background 180ms ease; }
.submit-button:hover { background: var(--color-accent); }
.contact-form__notice { border-left: 2px solid var(--color-accent); padding: .5rem 1rem; }
.contact-form__notice p { color: var(--color-secondary); font-size: .8rem; line-height: 1.7; margin: 0; }
.contact-form__notice a { align-items: center; color: var(--color-accent); display: inline-flex; font-size: .75rem; gap: .5rem; margin-top: .8rem; }
@media (max-width: 760px) { .contact__grid { grid-template-columns: 1fr; margin-top: 3rem; } .contact-form { border-top: 1px solid var(--color-border); padding-top: 2.5rem; } }
@media (max-width: 360px) { .contact :deep(h2) { font-size: 3.2rem; } }
</style>
