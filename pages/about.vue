<template>
  <div class="min-h-screen bg-white font-poppins">
    <!-- About Us Section (same as index) -->
    <section class="section-block py-20 md:py-24 bg-white scroll-mt-20 font-poppins">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div class="text-center lg:text-left font-poppins">
            <h1 class="text-3xl md:text-4xl font-bold font-poppins mb-6 md:mb-8" :style="{ color: siteData.about.titleColor }">
              {{ siteData.about.title }}
            </h1>
            <p
              v-for="(paragraph, index) in siteData.about.paragraphs"
              :key="index"
              class="text-base leading-relaxed font-poppins mb-4 md:mb-6"
              :style="{ color: siteData.about.textColor }"
            >
              <span v-html="paragraph.replace(/\n/g, '<br />')" />
            </p>
          </div>
          <div class="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              :src="siteData.about.image"
              :alt="siteData.about.imageAlt"
              class="w-full h-auto object-cover aspect-[4/3] md:aspect-auto"
            />
            <div class="absolute bottom-6 left-6 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full font-bold font-poppins text-palette-sage text-lg shadow-md">
              {{ siteData.about.overlayText }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What our community says (carousel) -->
    <section class="py-20 md:py-24 bg-palette-cream/50 font-poppins">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="text-center mb-10 md:mb-12">
          <h2 class="text-3xl md:text-4xl font-bold font-poppins text-palette-brown mb-4">
            {{ siteData.communitySays.title }}
          </h2>
          <p class="text-base text-palette-olive font-poppins max-w-2xl mx-auto">
            {{ siteData.communitySays.subtitle }}
          </p>
        </div>
        <div class="relative max-w-2xl mx-auto">
          <!-- Fixed height so footer does not move when changing reviews -->
          <div class="overflow-hidden h-[320px] md:h-[340px]">
            <Transition v-if="currentReview" name="review-slide" mode="out-in">
              <article
                :key="currentReview.id"
                class="bg-palette-white rounded-2xl shadow-md p-8 md:p-10 flex flex-col border border-palette-grey/50 text-center h-full box-border"
              >
                <div class="flex gap-1 justify-center mb-4 shrink-0" aria-hidden="true">
                  <span
                    v-for="n in (currentReview.rating ?? 5)"
                    :key="n"
                    class="text-palette-sage"
                  >
                    ★
                  </span>
                </div>
                <p class="text-palette-brown text-base md:text-lg leading-relaxed flex-1 min-h-0 overflow-y-auto mb-6">
                  "{{ currentReview.quote }}"
                </p>
                <div class="pt-4 border-t border-palette-grey/50 shrink-0">
                  <p class="font-semibold text-palette-brown">
                    {{ currentReview.name }}
                  </p>
                  <p class="text-palette-olive text-sm mt-0.5">
                    {{ currentReview.role }}
                  </p>
                </div>
              </article>
            </Transition>
          </div>
          <button
            type="button"
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-palette-sage text-palette-white shadow-lg hover:opacity-90 transition-opacity z-10"
            aria-label="Previous review"
            @click="prevReview"
          >
            <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            type="button"
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-palette-sage text-palette-white shadow-lg hover:opacity-90 transition-opacity z-10"
            aria-label="Next review"
            @click="nextReview"
          >
            <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </button>
          <div class="flex justify-center gap-2 mt-6">
            <button
              v-for="(_, index) in siteData.communitySays.reviews"
              :key="index"
              type="button"
              :aria-label="`Go to review ${index + 1}`"
              class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all"
              :class="currentReviewIndex === index ? 'bg-palette-sage scale-125' : 'bg-palette-grey hover:bg-palette-olive/50'"
              @click="currentReviewIndex = index"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { siteData } = useSiteData()

const reviews = computed(() => siteData.communitySays.reviews)
const currentReviewIndex = ref(0)
const currentReview = computed(() => reviews.value[currentReviewIndex.value] ?? reviews.value[0])

function nextReview() {
  currentReviewIndex.value = (currentReviewIndex.value + 1) % reviews.value.length
}

function prevReview() {
  currentReviewIndex.value = (currentReviewIndex.value - 1 + reviews.value.length) % reviews.value.length
}
</script>

<style scoped>
.review-slide-enter-active,
.review-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.review-slide-enter-from {
  opacity: 0;
  transform: translateX(1.5rem);
}
.review-slide-leave-to {
  opacity: 0;
  transform: translateX(-1.5rem);
}
</style>
