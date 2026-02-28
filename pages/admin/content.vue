<template>
  <div class="min-h-full bg-palette-cream/40 font-poppins">
    <header class="bg-palette-white border-b border-palette-olive/15 shadow-sm">
      <div class="px-6 lg:px-8 py-6 sm:py-8">
        <h1 class="font-heading text-2xl sm:text-3xl font-bold text-palette-brown">Site Content</h1>
        <p class="mt-1 text-sm text-palette-brown/70 max-w-xl">
          Edit text, images, and settings for each section of your public site. Pick a section below, edit, then Save. Refresh the public site to see updates.
        </p>
      </div>
    </header>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Sticky tab navigation -->
      <nav
        class="sticky top-0 z-10 -mx-4 px-4 py-3 sm:mx-0 sm:px-0 bg-palette-cream/95 backdrop-blur-md border-b border-palette-olive/20 mb-6 rounded-b-xl sm:rounded-none shadow-sm sm:shadow-none"
        aria-label="Content sections"
      >
        <div class="flex flex-nowrap gap-2 min-h-[44px] items-center justify-center">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            class="content-tab-btn px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap focus:outline-none"
            :class="activeTab === tab.id
              ? 'bg-palette-sage text-white'
              : 'text-palette-brown/80 hover:bg-palette-olive/15 hover:text-palette-brown'"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>
      </nav>

      <!-- Loading -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20 gap-3">
        <svg class="h-8 w-8 animate-spin text-palette-sage" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span class="text-palette-brown/70 text-sm">Loading content…</span>
      </div>

      <!-- Form content in card -->
      <template v-else>
        <!-- About Us -->
        <form
          v-show="activeTab === 'about'"
          class="content-form"
          @submit.prevent="saveSection('about', aboutForm)"
        >
          <div class="content-card">
            <h2 class="content-heading">About Us</h2>
            <p class="content-sub">Main story and image shown on the About section.</p>

            <section class="content-section">
              <h3 class="content-section-title">Text</h3>
              <div class="form-field">
                <label class="form-label">Title</label>
                <input v-model="aboutForm.title" type="text" class="form-input" />
              </div>
              <div class="form-field">
                <label class="form-label">Paragraphs</label>
                <p class="form-hint">One paragraph per line.</p>
                <textarea v-model="aboutParagraphsText" rows="5" class="form-input" placeholder="First paragraph…" />
              </div>
            </section>

            <section class="content-section">
              <h3 class="content-section-title">Image</h3>
              <div class="form-field">
                <label class="form-label">Main image</label>
                <AdminImageUpload v-model="aboutForm.image" />
              </div>
              <div class="form-field">
                <label class="form-label">Image alt text (accessibility)</label>
                <input v-model="aboutForm.imageAlt" type="text" class="form-input" placeholder="Describe the image" />
              </div>
              <div class="form-field">
                <label class="form-label">Overlay text on image</label>
                <input v-model="aboutForm.overlayText" type="text" class="form-input" />
              </div>
            </section>

            <section class="content-section">
              <h3 class="content-section-title">Button & colors</h3>
              <div class="form-field">
                <label class="form-label">Button label</label>
                <input v-model="aboutForm.button.text" type="text" class="form-input" />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="form-field">
                  <label class="form-label">Title color</label>
                  <input v-model="aboutForm.titleColor" type="text" class="form-input" placeholder="#7B7557" />
                </div>
                <div class="form-field">
                  <label class="form-label">Text color</label>
                  <input v-model="aboutForm.textColor" type="text" class="form-input" placeholder="#1E1E1E" />
                </div>
              </div>
            </section>

            <div class="form-actions">
              <button type="submit" class="btn-primary">Save About Us</button>
            </div>
          </div>
        </form>

        <!-- Our Space -->
        <form v-show="activeTab === 'ourSpace'" class="content-form" @submit.prevent="saveSection('ourSpace', ourSpaceForm)">
          <div class="content-card">
            <h2 class="content-heading">Our Space</h2>
            <p class="content-sub">Intro text and photo carousel for the space section.</p>
            <section class="content-section">
              <h3 class="content-section-title">Text</h3>
              <div class="form-field">
                <label class="form-label">Title</label>
                <input v-model="ourSpaceForm.title" type="text" class="form-input" />
              </div>
              <div class="form-field">
                <label class="form-label">Description</label>
                <textarea v-model="ourSpaceForm.description" rows="5" class="form-input" />
              </div>
              <div class="form-field">
                <label class="form-label">Button label</label>
                <input v-model="ourSpaceForm.button.text" type="text" class="form-input" />
              </div>
            </section>
            <section class="content-section">
              <h3 class="content-section-title">Carousel images</h3>
              <p class="text-sm text-palette-brown/80 mb-3">Use high-resolution images (e.g. 1200px wide or larger) for best quality on the homepage.</p>
              <div class="form-field">
                <AdminImageUploadList :model-value="ourSpaceForm.images" @update:model-value="(v) => (ourSpaceForm.images = v)" />
              </div>
            </section>
            <section class="content-section">
              <h3 class="content-section-title">Carousel settings</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="form-field">
                  <label class="form-label">Items per group</label>
                  <input v-model.number="ourSpaceForm.carousel.itemsPerGroup" type="number" min="1" class="form-input" />
                </div>
                <div class="form-field">
                  <label class="form-label">Auto slide (milliseconds)</label>
                  <input v-model.number="ourSpaceForm.carousel.autoSlideInterval" type="number" min="1000" class="form-input" />
                </div>
              </div>
            </section>
            <div class="form-actions">
              <button type="submit" class="btn-primary">Save Our Space</button>
            </div>
          </div>
        </form>

        <!-- Best-Selling Items -->
        <form v-show="activeTab === 'bestSelling'" class="content-form" @submit.prevent="saveSection('bestSellingItems', bestSellingForm)">
          <div class="content-card">
            <h2 class="content-heading">Best-Selling Items</h2>
            <p class="content-sub">Section title, description, and featured items on the homepage.</p>
            <section class="content-section">
              <h3 class="content-section-title">Section title</h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="form-field">
                  <label class="form-label">Prefix</label>
                  <input v-model="bestSellingForm.title.prefix" type="text" class="form-input" />
                </div>
                <div class="form-field">
                  <label class="form-label">Highlight</label>
                  <input v-model="bestSellingForm.title.highlight" type="text" class="form-input" />
                </div>
                <div class="form-field">
                  <label class="form-label">Suffix</label>
                  <input v-model="bestSellingForm.title.suffix" type="text" class="form-input" />
                </div>
              </div>
              <div class="form-field">
                <label class="form-label">Section description</label>
                <textarea v-model="bestSellingForm.description" rows="3" class="form-input" />
              </div>
              <div class="form-field">
                <label class="form-label">View Menu button</label>
                <input v-model="bestSellingForm.viewMenuButton.text" type="text" class="form-input" />
              </div>
            </section>
            <section class="content-section">
              <h3 class="content-section-title">Featured items</h3>
              <div v-for="(item, i) in bestSellingForm.items" :key="i" class="item-block">
                <div class="item-block-header">
                  <span>Item {{ i + 1 }}</span>
                  <button type="button" class="item-remove" @click="bestSellingForm.items.splice(i, 1)">Remove</button>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="form-field">
                    <label class="form-label">Name</label>
                    <input v-model="item.name" type="text" class="form-input" />
                  </div>
                  <div class="form-field">
                    <label class="form-label">Price</label>
                    <input v-model="item.price" type="text" class="form-input" placeholder="₱185" />
                  </div>
                </div>
                <div class="form-field">
                  <label class="form-label">Description</label>
                  <textarea v-model="item.description" rows="2" class="form-input" />
                </div>
                <div class="form-field">
                  <label class="form-label">Image</label>
                  <AdminImageUpload v-model="item.image" />
                </div>
              </div>
              <button type="button" class="btn-secondary mt-2" @click="addBestSellingItem">+ Add featured item</button>
            </section>
            <div class="form-actions">
              <button type="submit" class="btn-primary">Save Best-Selling</button>
            </div>
          </div>
        </form>

        <!-- Announcements -->
        <form v-show="activeTab === 'announcements'" class="content-form" @submit.prevent="saveSection('announcements', announcementsForm)">
          <div class="content-card">
            <h2 class="content-heading">Announcements</h2>
            <p class="content-sub">Promos and announcements shown on the homepage.</p>
            <section class="content-section">
              <div class="form-field">
                <label class="form-label">Section title</label>
                <input v-model="announcementsForm.title" type="text" class="form-input" />
              </div>
            </section>
            <section class="content-section">
              <h3 class="content-section-title">Announcement cards</h3>
              <div v-for="(item, i) in announcementsForm.items" :key="item.id" class="item-block">
                <div class="item-block-header">
                  <span>Announcement {{ i + 1 }}</span>
                  <button type="button" class="item-remove" @click="announcementsForm.items.splice(i, 1)">Remove</button>
                </div>
                <div class="form-field">
                  <label class="form-label">Title</label>
                  <input v-model="item.title" type="text" class="form-input" />
                </div>
                <div class="form-field">
                  <label class="form-label">Description (shown in detail modal)</label>
                  <textarea v-model="item.description" rows="3" class="form-input" placeholder="Optional full text for the announcement" />
                </div>
                <div class="form-field">
                  <label class="form-label">Image</label>
                  <AdminImageUpload v-model="item.image" />
                </div>
              </div>
              <button type="button" class="btn-secondary mt-2" @click="addAnnouncement">+ Add announcement</button>
            </section>
            <div class="form-actions">
              <button type="submit" class="btn-primary">Save Announcements</button>
            </div>
          </div>
        </form>

        <!-- FAQ -->
        <form v-show="activeTab === 'faq'" class="content-form" @submit.prevent="saveSection('faq', faqForm)">
          <div class="content-card">
            <h2 class="content-heading">Frequently Asked Questions</h2>
            <p class="content-sub">Questions and answers shown in the FAQ section.</p>
            <section class="content-section">
              <div class="form-field">
                <label class="form-label">Section title</label>
                <input v-model="faqForm.title" type="text" class="form-input" />
              </div>
            </section>
            <section class="content-section">
              <h3 class="content-section-title">Q&amp;A items</h3>
              <div v-for="(item, i) in faqForm.items" :key="item.id" class="item-block">
                <div class="item-block-header">
                  <span>Question {{ i + 1 }}</span>
                  <button type="button" class="item-remove" @click="faqForm.items.splice(i, 1)">Remove</button>
                </div>
                <div class="form-field">
                  <label class="form-label">Question</label>
                  <input v-model="item.question" type="text" class="form-input" />
                </div>
                <div class="form-field">
                  <label class="form-label">Answer</label>
                  <textarea v-model="item.answer" rows="3" class="form-input" />
                </div>
              </div>
              <button type="button" class="btn-secondary mt-2" @click="addFaq">+ Add question</button>
            </section>
            <div class="form-actions">
              <button type="submit" class="btn-primary">Save FAQ</button>
            </div>
          </div>
        </form>

        <!-- Contact -->
        <form v-show="activeTab === 'contact'" class="content-form" @submit.prevent="saveContactSection">
          <div class="content-card">
            <h2 class="content-heading">Contact Us</h2>
            <p class="content-sub">Contact section title, images, form labels, and map.</p>
            <section class="content-section">
              <div class="form-field">
                <label class="form-label">Section title</label>
                <input v-model="contactForm.title" type="text" class="form-input" />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="form-field">
                  <label class="form-label">Background image</label>
                  <AdminImageUpload v-model="contactForm.backgroundImage" />
                </div>
                <div class="form-field">
                  <label class="form-label">Building image</label>
                  <AdminImageUpload v-model="contactForm.buildingImage" />
                </div>
              </div>
            </section>
            <section class="content-section">
              <h3 class="content-section-title">Form field labels & placeholders</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-for="key in contactFormFields" :key="key" class="form-field">
                  <label class="form-label">{{ key }}</label>
                  <input v-model="contactForm.form[key].label" type="text" class="form-input form-input-sm" placeholder="Label" />
                  <input v-model="contactForm.form[key].placeholder" type="text" class="form-input form-input-sm mt-1" placeholder="Placeholder" />
                </div>
              </div>
            </section>
            <section class="content-section">
              <h3 class="content-section-title">Map</h3>
              <div class="form-field">
                <label class="form-label">Map heading</label>
                <input v-model="contactForm.map.title" type="text" class="form-input" />
              </div>
              <div class="form-field">
                <label class="form-label">Embed URL</label>
                <input v-model="contactForm.map.embedUrl" type="url" class="form-input" placeholder="https://..." />
              </div>
              <div class="form-field">
                <label class="form-label">Location text</label>
                <input v-model="contactForm.map.location" type="text" class="form-input" />
              </div>
            </section>
            <div class="form-actions">
              <button type="submit" class="btn-primary">Save Contact</button>
            </div>
          </div>
        </form>

        <!-- Footer -->
        <form v-show="activeTab === 'footer'" class="content-form" @submit.prevent="saveSection('footer', footerForm)">
          <div class="content-card">
            <h2 class="content-heading">Footer</h2>
            <p class="content-sub">Logo, sitemap links, address, and business hours at the bottom of every page.</p>
            <section class="content-section">
              <h3 class="content-section-title">Brand</h3>
              <div class="form-field">
                <label class="form-label">Logo image</label>
                <AdminImageUpload v-model="footerForm.logo.image" />
              </div>
              <div class="form-field">
                <label class="form-label">Logo text</label>
                <input v-model="footerForm.logo.text" type="text" class="form-input" />
              </div>
              <div class="form-field">
                <label class="form-label">Tagline</label>
                <input v-model="footerForm.logo.tagline" type="text" class="form-input" />
              </div>
            </section>
            <section class="content-section">
              <h3 class="content-section-title">Sitemap</h3>
              <div class="form-field">
                <label class="form-label">Sitemap heading</label>
                <input v-model="footerForm.sitemap.title" type="text" class="form-input" />
              </div>
              <div v-for="(link, i) in footerForm.sitemap.links" :key="i" class="grid grid-cols-1 sm:grid-cols-2 gap-3 form-field">
                <input v-model="link.text" type="text" class="form-input" placeholder="Link text" />
                <input v-model="link.to" type="text" class="form-input" placeholder="/path or #anchor" />
              </div>
            </section>
            <section class="content-section">
              <h3 class="content-section-title">Location & hours</h3>
              <div class="form-field">
                <label class="form-label">Location heading</label>
                <input v-model="footerForm.location.title" type="text" class="form-input" />
              </div>
              <div class="form-field">
                <label class="form-label">Full address</label>
                <textarea v-model="footerForm.location.address" rows="2" class="form-input" />
              </div>
              <div class="form-field">
                <label class="form-label">Business hours heading</label>
                <input v-model="footerForm.businessHours.title" type="text" class="form-input" />
              </div>
              <div class="form-field">
                <label class="form-label">Hours (one line per entry)</label>
                <textarea v-model="footerHoursText" rows="3" class="form-input" placeholder="Monday to Saturday" />
              </div>
              <div class="form-field">
                <label class="form-label">Powered by / credit</label>
                <input v-model="footerForm.poweredBy" type="text" class="form-input" />
              </div>
            </section>
            <div class="form-actions">
              <button type="submit" class="btn-primary">Save Footer</button>
            </div>
          </div>
        </form>

        <!-- Hero -->
        <form v-show="activeTab === 'hero'" class="content-form" @submit.prevent="saveSection('hero', heroForm)">
          <div class="content-card">
            <h2 class="content-heading">Hero (Homepage)</h2>
            <p class="content-sub">Top banner: background image, headline, and buttons.</p>
            <section class="content-section">
              <div class="form-field">
                <label class="form-label">Background image</label>
                <AdminImageUpload v-model="heroForm.backgroundImage" />
              </div>
              <div class="form-field">
                <label class="form-label">Subtitle</label>
                <input v-model="heroForm.subtitle" type="text" class="form-input" />
              </div>
              <div class="form-field">
                <label class="form-label">Main title</label>
                <input v-model="heroForm.title" type="text" class="form-input" />
              </div>
              <div class="form-field">
                <label class="form-label">Highlighted word (in title)</label>
                <input v-model="heroForm.titleHighlight" type="text" class="form-input" placeholder="e.g. here" />
              </div>
              <div class="form-field">
                <label class="form-label">Short description</label>
                <textarea v-model="heroForm.description" rows="2" class="form-input" />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="form-field">
                  <label class="form-label">Primary button</label>
                  <input v-model="heroForm.buttons[0].text" type="text" class="form-input" />
                </div>
                <div class="form-field">
                  <label class="form-label">Secondary button</label>
                  <input v-model="heroForm.buttons[1].text" type="text" class="form-input" />
                </div>
              </div>
            </section>
            <div class="form-actions">
              <button type="submit" class="btn-primary">Save Hero</button>
            </div>
          </div>
        </form>

      </template>

      <!-- Save feedback -->
      <Transition name="fade">
        <div
          v-if="saveMessage"
          class="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl text-sm border shadow-sm max-w-3xl mx-auto"
          :class="saveSuccess ? 'bg-palette-sage/10 border-palette-sage/30 text-palette-sage' : 'bg-red-50/90 border-red-200 text-red-700'"
        >
          <span v-if="saveSuccess" class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-palette-sage/20">
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          </span>
          <span v-else class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100">
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </span>
          <span>{{ saveMessage }}</span>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import staticSiteData from '~/data/site-data'

definePageMeta({ layout: 'admin' })

const tabs = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About Us' },
  { id: 'ourSpace', label: 'Our Space' },
  { id: 'bestSelling', label: 'Best-Selling' },
  { id: 'announcements', label: 'Announcements' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
  { id: 'footer', label: 'Footer' },
]

const activeTab = ref('hero')
const loading = ref(true)
const saveMessage = ref('')
const saveSuccess = ref(false)

type SiteContent = {
  hero?: Record<string, unknown>
  about?: Record<string, unknown>
  ourSpace?: Record<string, unknown>
  bestSellingItems?: Record<string, unknown>
  announcements?: Record<string, unknown>
  faq?: Record<string, unknown>
  contact?: Record<string, unknown>
  footer?: Record<string, unknown>
}

const defaultAbout = () => ({
  title: 'About us',
  paragraphs: ['', '', ''],
  image: '/images/about.jpeg',
  imageAlt: '',
  overlayText: '',
  button: { text: 'LEARN MORE', action: 'learn-more' },
  titleColor: '#7B7557',
  textColor: '#1E1E1E',
  buttonColor: '#7B7557',
  buttonHoverColor: '#605B45',
})
const defaultOurSpace = () => ({
  title: 'Our Space',
  description: '',
  button: { text: 'RATES', action: 'rates' },
  images: [] as string[],
  carousel: { itemsPerGroup: 4, autoSlideInterval: 5000 },
})
const defaultBestSelling = () => ({
  title: { prefix: 'Our', highlight: 'Best-Selling', suffix: 'Items' },
  description: '',
  items: [] as Record<string, string>[],
  viewMenuButton: { text: 'View Menu', action: 'view-menu' },
})
const defaultAnnouncements = () => ({
  title: 'Announcements',
  items: [] as { id: string; title: string; image: string; description?: string }[],
})
const defaultFaq = () => ({
  title: 'Frequently Asked Questions',
  items: [] as { id: string; question: string; answer: string }[],
})
const defaultContact = () => ({
  title: 'Contact Us',
  form: {
    firstName: { label: '', placeholder: '' },
    lastName: { label: '', placeholder: '' },
    email: { label: '', placeholder: '' },
    phone: { label: '', placeholder: '' },
    subject: { label: '', placeholder: '' },
    message: { label: '', placeholder: '' },
  },
  map: { title: '', embedUrl: '', location: '', placeName: '' },
  buildingImage: '',
  backgroundImage: '',
})
const defaultFooter = () => ({
  logo: { image: '', text: '', tagline: '' },
  sitemap: { title: 'Sitemap', links: [] as { text: string; to: string }[] },
  location: { title: 'Location', address: '' },
  businessHours: { title: 'Business Hours', hours: [] as string[] },
  poweredBy: '',
})
const defaultHero = () => ({
  backgroundImage: '',
  backgroundImageAlt: '',
  subtitle: '',
  title: '',
  titleHighlight: 'here',
  description: '',
  buttons: [{ text: 'ORDER NOW', type: 'primary', action: 'order' }, { text: 'BOOK OUR SPACE', type: 'secondary', action: 'book' }],
})
const aboutForm = ref<ReturnType<typeof defaultAbout>>(defaultAbout())
const ourSpaceForm = ref<ReturnType<typeof defaultOurSpace>>(defaultOurSpace())
const bestSellingForm = ref<ReturnType<typeof defaultBestSelling>>(defaultBestSelling())
const announcementsForm = ref<ReturnType<typeof defaultAnnouncements>>(defaultAnnouncements())
const faqForm = ref<ReturnType<typeof defaultFaq>>(defaultFaq())
const contactForm = ref<ReturnType<typeof defaultContact>>(defaultContact())
const footerForm = ref<ReturnType<typeof defaultFooter>>(defaultFooter())
const heroForm = ref<ReturnType<typeof defaultHero>>(defaultHero())

const contactFormFields = ['firstName', 'lastName', 'email', 'phone', 'subject', 'message'] as const

const aboutParagraphsText = computed({
  get: () => (aboutForm.value.paragraphs || []).join('\n'),
  set: (v: string) => { aboutForm.value.paragraphs = v ? v.split('\n').map(p => p.trim()) : [] },
})
const footerHoursText = computed({
  get: () => (footerForm.value.businessHours?.hours || []).join('\n'),
  set: (v: string) => { footerForm.value.businessHours = footerForm.value.businessHours || { title: '', hours: [] }; footerForm.value.businessHours.hours = v ? v.split('\n').map(h => h.trim()).filter(Boolean) : [] },
})

const contactMapPreviewUrl = computed(() => {
  const loc = contactForm.value.map.location
  if (loc?.trim()) return buildMapEmbedUrl(loc)
  return contactForm.value.map.embedUrl || ''
})

function applyContent(data: SiteContent) {
  if (data.about) {
    const a = data.about as ReturnType<typeof defaultAbout>
    aboutForm.value = { ...defaultAbout(), ...a, paragraphs: Array.isArray(a.paragraphs) ? [...a.paragraphs] : aboutForm.value.paragraphs, button: { ...defaultAbout().button, ...a.button } }
  }
  if (data.ourSpace) {
    const o = data.ourSpace as ReturnType<typeof defaultOurSpace>
    ourSpaceForm.value = { ...defaultOurSpace(), ...o, images: Array.isArray(o.images) ? [...o.images] : [], carousel: { ...defaultOurSpace().carousel, ...o.carousel }, button: { ...defaultOurSpace().button, ...o.button } }
  }
  if (data.bestSellingItems) {
    const b = data.bestSellingItems as ReturnType<typeof defaultBestSelling>
    bestSellingForm.value = { ...defaultBestSelling(), ...b, title: { ...defaultBestSelling().title, ...b.title }, items: b.items ? b.items.map(i => ({ ...i })) : [], viewMenuButton: { ...defaultBestSelling().viewMenuButton, ...b.viewMenuButton } }
  }
  if (data.announcements) {
    const a = data.announcements as ReturnType<typeof defaultAnnouncements>
    announcementsForm.value = { title: a.title || defaultAnnouncements().title, items: (a.items || []).map(i => ({ id: i.id, title: i.title, image: i.image, description: i.description ?? '' })) }
  }
  if (data.faq) {
    const f = data.faq as ReturnType<typeof defaultFaq>
    faqForm.value = { title: f.title || defaultFaq().title, items: (f.items || []).map(i => ({ ...i })) }
  }
  if (data.contact) {
    const c = data.contact as ReturnType<typeof defaultContact>
    contactForm.value = { ...defaultContact(), ...c, form: { ...defaultContact().form, ...c.form }, map: { ...defaultContact().map, ...c.map } }
    if (contactForm.value.map.embedUrl && !contactForm.value.map.location) {
      const match = contactForm.value.map.embedUrl.match(/[?&]q=([^&]+)/)
      if (match) contactForm.value.map.location = decodeURIComponent(match[1].replace(/\+/g, ' '))
    }
  }
  if (data.footer) {
    const f = data.footer as ReturnType<typeof defaultFooter>
    footerForm.value = { ...defaultFooter(), ...f, logo: { ...defaultFooter().logo, ...f.logo }, sitemap: { ...defaultFooter().sitemap, ...f.sitemap, links: (f.sitemap?.links || []).map(l => ({ ...l })) }, location: { ...defaultFooter().location, ...f.location }, businessHours: { ...defaultFooter().businessHours, ...f.businessHours, hours: [...(f.businessHours?.hours || [])] } }
  }
  if (data.hero) {
    const h = data.hero as ReturnType<typeof defaultHero>
    heroForm.value = { ...defaultHero(), ...h, buttons: (h.buttons || defaultHero().buttons).map((b: Record<string, string>, i: number) => ({ ...defaultHero().buttons[i], ...b })) }
  }
}

async function loadContent() {
  loading.value = true
  try {
    const data = await $fetch<SiteContent>('/api/site-content')
    applyContent(data)
  } catch {
    applyContent(staticSiteData as unknown as SiteContent)
  } finally {
    loading.value = false
  }
}

function addAnnouncement() {
  announcementsForm.value.items.push({ id: `ann-${Date.now()}`, title: '', image: '', description: '' })
}
function addFaq() {
  faqForm.value.items.push({ id: `faq-${Date.now()}`, question: '', answer: '' })
}
function addBestSellingItem() {
  bestSellingForm.value.items.push({ name: '', price: '', description: '', image: '' })
}

function buildMapEmbedUrl(location: string): string {
  if (!location?.trim()) return ''
  return `https://www.google.com/maps?q=${encodeURIComponent(location.trim())}&output=embed`
}

function saveContactSection() {
  const map = { ...contactForm.value.map }
  map.embedUrl = buildMapEmbedUrl(map.location)
  contactForm.value.map.embedUrl = map.embedUrl
  const payload = { ...contactForm.value, map }
  saveSection('contact', payload)
}

const { log: logActivity } = useActivityLog()

async function saveSection(section: string, payload: unknown) {
  saveMessage.value = ''
  try {
    await $fetch('/api/site-content', { method: 'PUT', body: { [section]: payload } })
    saveSuccess.value = true
    saveMessage.value = 'Saved. Refresh the public site to see changes.'
    logActivity('Save site content', section)
  } catch (e) {
    saveSuccess.value = false
    saveMessage.value = e instanceof Error ? e.message : 'Save failed.'
  }
}

onMounted(loadContent)
</script>

<style scoped>
.content-form {
  @apply space-y-0 flex flex-col items-center;
}
.content-card {
  @apply w-full max-w-3xl mx-auto bg-palette-white rounded-2xl border border-palette-olive/15 shadow-md overflow-hidden;
}
.content-heading {
  font-family: Fraunces, Georgia, serif;
  @apply text-xl font-bold text-palette-brown px-6 pt-6 pb-0;
}
.content-sub {
  @apply text-sm text-palette-brown/70 px-6 pb-5 pt-1 border-b border-palette-olive/10;
}
.content-section {
  @apply px-6 py-5 border-b border-palette-olive/10 last:border-b-0 bg-palette-white;
}
.content-section:nth-child(even) {
  @apply bg-palette-cream/20;
}
.content-section-title {
  @apply text-xs font-semibold uppercase tracking-wider text-palette-brown/80 mb-4 flex items-center gap-2;
}
.content-section-title::before {
  content: '';
  @apply h-px flex-1 max-w-[2rem] bg-palette-sage/50;
}
.form-field {
  @apply mb-4 last:mb-0;
}
.form-label {
  @apply block text-sm font-medium text-palette-brown mb-1.5;
}
.form-hint {
  @apply text-xs text-palette-brown/60 mb-1;
}
.form-input {
  @apply w-full px-3 py-2.5 text-sm border border-palette-olive/25 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-palette-sage/40 focus:border-palette-sage transition-colors;
}
.form-input-sm {
  @apply py-2 text-sm rounded-lg;
}
.form-actions {
  @apply px-6 py-5 bg-palette-olive/5 border-t border-palette-olive/15;
}
.btn-primary {
  @apply inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-palette-sage text-white text-sm font-semibold rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-palette-sage/50 focus:ring-offset-2 transition-opacity shadow-sm;
}
.btn-secondary {
  @apply inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-palette-sage border border-palette-sage/50 rounded-xl hover:bg-palette-sage/10 focus:outline-none focus:ring-2 focus:ring-palette-sage/30 transition-colors;
}
.item-block {
  @apply p-4 mb-4 rounded-xl border border-palette-olive/15 bg-palette-cream/25 last:mb-0 shadow-sm;
}
.item-block-header {
  @apply flex justify-between items-center mb-3 pb-2 border-b border-palette-olive/10;
}
.item-block-header span {
  @apply text-sm font-medium text-palette-brown;
}
.item-remove {
  @apply text-sm text-red-600 hover:text-red-700 hover:underline focus:outline-none rounded px-1 -mx-1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.content-tab-btn {
  -webkit-tap-highlight-color: transparent;
}
.content-tab-btn:active {
  transform: none;
}
</style>
