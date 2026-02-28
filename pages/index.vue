<template>
  <div class="min-h-screen font-poppins">
    <!-- Hero Section (Figma reference: light overlay, dark text, #3AFF86 accent, Poppins) -->
    <section id="hero" class="relative h-[90vh] min-h-[680px] flex flex-col justify-start pt-6 sm:pt-8 md:pt-10 overflow-hidden scroll-mt-0">
      <div class="absolute inset-0">
        <img :src="siteData.hero.backgroundImage" :alt="siteData.hero.backgroundImageAlt" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-white/65" aria-hidden="true" />
      </div>
      <div class="relative z-10 text-center px-6 lg:px-12 max-w-5xl mx-auto mt-2 sm:mt-4 font-poppins">
        <h5 class="text-sm sm:text-base md:text-lg font-bold font-poppins uppercase tracking-widest mb-2 md:mb-3" style="color: #1a1a1a">{{ siteData.hero.subtitle }}</h5>
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-poppins leading-tight mb-3 md:mb-4" style="color: #1a1a1a">
          {{ siteData.hero.title }} <span style="color: #3AFF86">{{ siteData.hero.titleHighlight }}</span>.
        </h1>
        <p class="text-base font-medium font-poppins max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed" style="color: #1a1a1a">{{ siteData.hero.description }}</p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <NuxtLink
            v-for="(button, index) in siteData.hero.buttons"
            :key="index"
            :to="button.action === 'order' ? '/menu' : '/venues'"
            :class="[
              'font-bold font-poppins text-sm px-5 py-2.5 rounded-full uppercase tracking-wide transition-opacity hover:opacity-90',
              button.type === 'primary'
                ? 'text-white border-2 hover:opacity-90'
                : 'border-2 bg-transparent hover:bg-[#7B7557]/10'
            ]"
            :style="button.type === 'primary'
              ? { backgroundColor: '#69AC7C', borderColor: '#69AC7C' }
              : { borderColor: '#7B7557', color: '#7B7557' }"
          >
            {{ button.text }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- About Us Section -->
    <section id="about" class="section-block py-20 md:py-24 bg-white scroll-mt-20 font-poppins">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div class="text-center lg:text-left font-poppins">
            <h2 class="text-3xl md:text-4xl font-bold font-poppins mb-6 md:mb-8" :style="{ color: siteData.about.titleColor }">{{ siteData.about.title }}</h2>
            <p v-for="(paragraph, index) in siteData.about.paragraphs" :key="index" class="text-base leading-relaxed font-poppins mb-4 md:mb-6" :style="{ color: siteData.about.textColor }">
              <span v-html="paragraph.replace(/\n/g, '<br />')"></span>
            </p>
            <div class="mt-8 md:mt-10 flex justify-center lg:justify-start">
              <NuxtLink
                to="/about"
                class="inline-flex items-center justify-center min-w-[160px] text-white font-bold font-poppins text-sm px-5 py-2.5 rounded-full uppercase tracking-wide transition-opacity hover:opacity-90"
                :style="{ backgroundColor: siteData.about.buttonColor }"
                @mouseover="($event as MouseEvent & { currentTarget: HTMLElement }).currentTarget.style.backgroundColor = siteData.about.buttonHoverColor"
                @mouseleave="($event as MouseEvent & { currentTarget: HTMLElement }).currentTarget.style.backgroundColor = siteData.about.buttonColor"
              >
                {{ siteData.about.button.text }}
              </NuxtLink>
            </div>
          </div>
          <div class="relative rounded-2xl overflow-hidden shadow-2xl">
            <img :src="siteData.about.image" :alt="siteData.about.imageAlt" class="w-full h-auto object-cover aspect-[4/3] md:aspect-auto" />
            <div class="absolute bottom-6 left-6 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full font-bold font-poppins text-workflow-green text-lg shadow-md">{{ siteData.about.overlayText }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Marquee Bar (High Speed Internet, etc.) - green -->
    <div class="py-4 md:py-5 overflow-hidden font-poppins" style="background-color: #69AC7C;">
      <div class="relative">
        <div class="animate-marquee whitespace-nowrap flex items-center">
          <div v-for="n in 2" :key="n" class="inline-flex items-center gap-4 md:gap-6 lg:gap-8 px-4 md:px-6 text-white text-base md:text-lg font-semibold font-poppins uppercase tracking-wider">
            <div v-for="(feature, index) in siteData.features" :key="index" class="flex items-center gap-3 min-w-max">
              <div class="rounded-full bg-white/25 p-2.5 flex items-center justify-center">
                <svg class="w-6 h-6 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path v-if="feature.icon === 'wifi'" stroke-linecap="round" stroke-linejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  <g v-else-if="feature.icon === 'outlet'">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1V9a1 1 0 011-1z" />
                    <circle cx="9" cy="12.5" r="1.25" stroke="currentColor" fill="none" stroke-width="2" />
                    <circle cx="15" cy="12.5" r="1.25" stroke="currentColor" fill="none" stroke-width="2" />
                  </g>
                  <path v-else-if="feature.icon === 'ac'" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16v3H4V6zm0 5h16M4 14h16M4 17h16" />
                  <path v-else-if="feature.icon === 'chair'" stroke-linecap="round" stroke-linejoin="round" d="M6 18h12v1.5H6V18zm2.5-1.5V9h7v7.5M12 19.5v1.5m-2.5 0h5" />
                </svg>
              </div>
              <span class="drop-shadow-sm">{{ feature.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Our Space Section -->
    <section id="our-space" class="section-block py-20 md:py-24 bg-palette-cream/50 font-poppins scroll-mt-20">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div class="w-full max-w-5xl mx-auto">
          <!-- Heading centered -->
          <h2 class="text-3xl md:text-4xl font-bold font-poppins mb-6 md:mb-8 text-center" style="color: #69AC7C">{{ siteData.ourSpace.title }}</h2>
          <!-- Text and button left-aligned with carousel -->
          <div class="mb-8 md:mb-10">
            <p class="text-base text-gray-700 font-poppins leading-relaxed mb-6 md:mb-8 text-left">{{ siteData.ourSpace.description }}</p>
            <NuxtLink to="/venues" class="inline-flex items-center justify-center min-w-[160px] font-bold font-poppins text-sm px-5 py-2.5 rounded-full uppercase tracking-wide text-white border-2 transition-opacity hover:opacity-90 shadow-md" :style="{ backgroundColor: '#69AC7C', borderColor: '#69AC7C' }">
              {{ siteData.ourSpace.button.text }}
            </NuxtLink>
          </div>
          <!-- 4 images in a row, carousel with next button -->
          <div class="relative w-full">
            <div class="overflow-hidden rounded-xl border border-gray-200/80 w-full">
              <div
                class="flex w-full ease-in-out"
                :class="{ 'transition-transform duration-500': !carouselNoTransition }"
                :style="{ transform: `translateX(-${currentGroup * 100}%)` }"
              >
                <div v-for="(group, groupIndex) in extendedGroupedSlides" :key="'carousel-' + groupIndex" class="w-full min-w-full flex-shrink-0 grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 p-0">
                  <div v-for="(slide, index) in group" :key="index" class="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-gray-100">
                    <img
                      :src="slide"
                      class="w-full h-full object-cover"
                      style="image-rendering: auto; -webkit-backface-visibility: hidden; backface-visibility: hidden;"
                      decoding="async"
                      :fetchpriority="groupIndex === 0 && index < 4 ? 'high' : undefined"
                      :loading="groupIndex === 0 && index < 4 ? 'eager' : 'lazy'"
                      :alt="`Space image ${(groupIndex % (groupedSlides.length || 1)) * siteData.ourSpace.carousel.itemsPerGroup + index + 1}`"
                      @error="($e: Event) => (($e.target as HTMLImageElement).style.display = 'none')"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button type="button" @click="prevGroup" class="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg hover:bg-white border border-gray-200 transition-colors z-10" aria-label="Previous">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button type="button" @click="nextGroup" class="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg hover:bg-white border border-gray-200 transition-colors z-10" aria-label="Next">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Service Features Bar -->
    <div class="max-w-[800px] mx-auto px-2 lg:px-4 py-2 md:py-3 font-poppins">
      <div class="py-3 md:py-4 px-4 lg:px-6 font-poppins" style="background-color: #7B7557; border-radius: 50px;">
        <div class="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 lg:gap-6">
          <div v-for="(feature, index) in siteData.serviceFeatures" :key="index" class="flex items-center gap-2">
            <div class="rounded-full bg-white p-1.5 flex items-center justify-center">
              <svg v-if="feature.icon === 'chef'" class="w-5 h-5" fill="none" stroke="#4B5563" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m0-16c-2 0-4 1-4 3v1h8V7c0-2-2-3-4-3zm0 0V2m0 2c2 0 4 1 4 3v1h-8V7c0-2 2-3 4-3z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 8h8M8 12h8M8 16h8" /></svg>
              <svg v-else-if="feature.icon === 'basket'" class="w-5 h-5" fill="none" stroke="#4B5563" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <svg v-else-if="feature.icon === 'lightbulb'" class="w-5 h-5" fill="none" stroke="#4B5563" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <span class="text-white font-poppins font-bold text-sm md:text-base uppercase tracking-wide">{{ feature.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Best-Selling Items Section -->
    <section id="best-selling" class="section-block py-20 md:py-24 bg-white font-poppins scroll-mt-20">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="text-center mb-10 md:mb-12">
          <h2 class="text-3xl md:text-4xl font-bold font-poppins mb-6 md:mb-8">
            {{ siteData.bestSellingItems.title.prefix }} <span style="color: #3AFF86">{{ siteData.bestSellingItems.title.highlight }}</span> {{ siteData.bestSellingItems.title.suffix }}
          </h2>
        </div>
        <p class="text-base text-gray-700 font-poppins leading-relaxed max-w-4xl mx-auto text-justify mb-10 md:mb-12 px-4 md:px-6" style="text-indent: 2em;">{{ siteData.bestSellingItems.description }}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16 md:mb-20 max-w-6xl mx-auto px-4 md:px-6">
          <MenuCard v-for="item in bestSellingMenuItems" :key="item.id" :item="item" @added-to-cart="onAddedToCart" />
        </div>
        <!-- Added to cart modal (index only) -->
        <Teleport to="body">
          <div v-if="showAddedToCartModal" class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 font-poppins" @click.self="showAddedToCartModal = false">
            <div class="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center" @click.stop>
              <p class="text-gray-800 font-medium mb-6">
                {{ addedToCartItemName ? `"${addedToCartItemName}" has been added to your cart.` : 'Item has been added to your cart.' }}
              </p>
              <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button type="button" class="inline-flex items-center justify-center min-w-[140px] py-2.5 px-5 rounded-full font-semibold text-sm border-2 transition-colors" style="border-color: #7B7557; color: #7B7557" @click="showAddedToCartModal = false">
                  Done
                </button>
                <NuxtLink to="/cart" class="inline-flex items-center justify-center min-w-[140px] py-2.5 px-5 rounded-full font-semibold text-sm text-white transition-opacity hover:opacity-90" style="background-color: #7B7557" @click="showAddedToCartModal = false">
                  View Cart
                </NuxtLink>
              </div>
            </div>
          </div>
        </Teleport>
        <div class="text-center mt-8 md:mt-12 flex justify-center">
          <NuxtLink to="/menu" class="inline-flex items-center justify-center min-w-[160px] font-bold font-poppins text-sm px-5 py-2.5 rounded-full uppercase tracking-wide text-white transition-opacity hover:opacity-90" style="background-color: #7B7557;">{{ siteData.bestSellingItems.viewMenuButton.text }}</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Announcements Section -->
    <section id="announcements" class="section-block py-20 md:py-24 bg-palette-cream/50 font-poppins scroll-mt-20">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="text-center mb-10 md:mb-12">
          <h2 class="text-3xl md:text-4xl font-bold font-poppins mb-6 md:mb-8 text-workflow-green">{{ siteData.announcements.title }}</h2>
        </div>
        <div class="flex justify-center items-center relative overflow-x-auto overflow-y-visible pb-12 px-4 md:px-8">
          <div class="flex items-end justify-center relative mx-auto">
            <button
              v-for="(announcement, displayIndex) in displayedAnnouncements"
              :key="`${announcement.id}-${currentAnnouncementIndex}`"
              type="button"
              class="relative transition-all duration-500 ease-out hover:scale-105 hover:z-50 w-[140px] md:w-[170px] lg:w-[200px] h-[210px] md:h-[255px] lg:h-[300px] cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-workflow-green"
              :style="{
                transform: displayIndex === 0 || displayIndex === 4 ? 'scale(0.65)' : displayIndex === 1 || displayIndex === 3 ? 'scale(0.80)' : 'scale(1)',
                zIndex: displayIndex === 2 ? 30 : displayIndex === 1 || displayIndex === 3 ? 20 : 10,
                opacity: displayIndex === 2 ? 1 : displayIndex === 1 || displayIndex === 3 ? 0.88 : 0.75,
                marginRight: displayIndex === 0 || displayIndex === 3 ? '-45px' : displayIndex < displayedAnnouncements.length - 1 ? '-5px' : '0'
              }"
              @click="openAnnouncementModal(announcement)"
            >
              <div class="bg-white rounded-xl shadow-2xl overflow-hidden h-full w-full border-2 border-white/50">
                <img :src="announcement.image" :alt="announcement.title" class="w-full h-full object-cover" />
              </div>
            </button>
          </div>
          <button @click="prevAnnouncement" class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-workflow-green text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 z-50" style="background-color: #7B7557;" aria-label="Previous announcement">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button @click="nextAnnouncement" class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-workflow-green text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 z-50" style="background-color: #7B7557;" aria-label="Next announcement">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Announcement detail modal -->
    <AnnouncementDetailModal v-model="showAnnouncementModal" :announcement="selectedAnnouncement" />

    <!-- FAQ Section -->
    <section id="faq" class="section-block py-20 md:py-24 bg-white font-poppins scroll-mt-20">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="text-center mb-10 md:mb-12">
          <h2 class="text-3xl md:text-4xl font-bold font-poppins mb-6 md:mb-8" style="color: #7B7557;">{{ siteData.faq.title }}</h2>
        </div>
        <div class="max-w-4xl mx-auto">
          <div v-for="(item, index) in siteData.faq.items" :key="item.id" class="border-t border-gray-200 overflow-hidden first:border-t-0" style="border-radius: 0;">
            <button
              @click="toggleFaq(index)"
              class="w-full text-white font-semibold font-poppins text-left px-6 py-4 flex items-center justify-between hover:bg-green-700 transition-colors duration-300"
              style="background-color: #7B7557; border-radius: 0;"
              @mouseover="($event as MouseEvent & { currentTarget: HTMLElement }).currentTarget.style.backgroundColor = '#5E5A45'"
              @mouseleave="($event as MouseEvent & { currentTarget: HTMLElement }).currentTarget.style.backgroundColor = '#7B7557'"
            >
              <span class="text-base md:text-lg">{{ item.question }}</span>
              <svg class="w-5 h-5 transition-transform duration-300 flex-shrink-0 ml-4" :class="{ 'rotate-180': openFaqIndex === index }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div v-show="openFaqIndex === index" class="bg-amber-50 px-6 py-4 text-gray-700 font-poppins text-base leading-relaxed">{{ item.answer }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Us Section (on homepage) -->
    <section id="contact" class="section-block font-poppins py-20 md:py-24 relative scroll-mt-20 bg-palette-cream/50" :style="{ backgroundImage: `url(${siteData.contact.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }">
      <div class="absolute inset-0 bg-palette-cream/80 backdrop-blur-sm"></div>
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div class="px-6 lg:px-0">
            <h2 class="text-3xl md:text-4xl font-bold font-poppins mb-8" style="color: #7B7557;">{{ siteData.contact.title }}</h2>
            <form class="space-y-4" @submit.prevent>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 font-poppins mb-2">{{ siteData.contact.form.firstName.label }}</label>
                  <input type="text" :placeholder="siteData.contact.form.firstName.placeholder" class="w-full px-4 py-3 border-2 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-workflow-green bg-white" style="border-color: #7B7557;" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 font-poppins mb-2">{{ siteData.contact.form.lastName.label }}</label>
                  <input type="text" :placeholder="siteData.contact.form.lastName.placeholder" class="w-full px-4 py-3 border-2 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-workflow-green bg-white" style="border-color: #7B7557;" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 font-poppins mb-2">{{ siteData.contact.form.email.label }}</label>
                <input type="email" :placeholder="siteData.contact.form.email.placeholder" class="w-full px-4 py-3 border-2 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-workflow-green bg-white" style="border-color: #7B7557;" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 font-poppins mb-2">{{ siteData.contact.form.phone.label }}</label>
                <input type="tel" :placeholder="siteData.contact.form.phone.placeholder" class="w-full px-4 py-3 border-2 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-workflow-green bg-white" style="border-color: #7B7557;" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 font-poppins mb-2">{{ siteData.contact.form.subject.label }}</label>
                <input type="text" :placeholder="siteData.contact.form.subject.placeholder" class="w-full px-4 py-3 border-2 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-workflow-green bg-white" style="border-color: #7B7557;" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 font-poppins mb-2">{{ siteData.contact.form.message.label }}</label>
                <textarea :placeholder="siteData.contact.form.message.placeholder" rows="6" class="w-full px-4 py-3 border-2 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-workflow-green resize-none bg-white" style="border-color: #7B7557;"></textarea>
              </div>
              <NuxtLink to="/contact" class="inline-flex items-center justify-center w-full font-bold font-poppins text-sm px-5 py-2.5 rounded-full uppercase tracking-wide text-white transition-opacity hover:opacity-90 text-center" style="background-color: #7B7557;">Send Message</NuxtLink>
            </form>
          </div>
          <div class="space-y-4 px-6 lg:px-0">
            <h2 class="text-3xl md:text-4xl font-bold font-poppins mb-6 md:mb-8" style="color: #7B7557;">{{ siteData.contact.map.title }}</h2>
            <div class="w-full h-96 md:h-[400px] rounded-lg overflow-hidden shadow-lg">
              <iframe :src="siteData.contact.map.embedUrl" width="100%" height="100%" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Map" />
            </div>
            <div class="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
              <img :src="siteData.contact.buildingImage" alt="Workflow Coworking Space Building" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import menuJson from '~/data/menu.json'

interface MenuItem {
  id: number
  name: string
  price: number
  image: string
  available: boolean
  description?: string
  variants?: string[]
}

interface MenuCategory {
  category: string
  items: MenuItem[]
}

const { siteData } = useSiteData()
const menuData = menuJson as MenuCategory[]

const bestSellingMenuItems = computed(() => {
  const byName: Record<string, MenuItem> = {}
  for (const cat of menuData) {
    for (const item of cat.items) {
      byName[item.name] = item
    }
  }
  return siteData.bestSellingItems.items
    .map((bs) => byName[bs.name])
    .filter((item): item is MenuItem => item != null)
})

const showAddedToCartModal = ref(false)
const addedToCartItemName = ref('')
function onAddedToCart(itemName: string) {
  addedToCartItemName.value = itemName
  showAddedToCartModal.value = true
}

const slides = computed(() => siteData.ourSpace.images)
const currentGroup = ref(0)
const carouselNoTransition = ref(false)
const itemsPerGroup = computed(() => siteData.ourSpace.carousel.itemsPerGroup)

const groupedSlides = computed(() => {
  const groups: string[][] = []
  for (let i = 0; i < slides.value.length; i += itemsPerGroup.value) {
    groups.push(slides.value.slice(i, i + itemsPerGroup.value))
  }
  return groups
})

const extendedGroupedSlides = computed(() => [...groupedSlides.value, ...groupedSlides.value])

const currentGroupIndex = computed(() => {
  const N = groupedSlides.value.length
  return N ? currentGroup.value % N : 0
})

const nextGroup = () => {
  const N = groupedSlides.value.length
  const total = 2 * N
  if (total === 0) return
  currentGroup.value = (currentGroup.value + 1) % total
  if (currentGroup.value === N) {
    setTimeout(() => {
      carouselNoTransition.value = true
      currentGroup.value = 0
      nextTick(() => { carouselNoTransition.value = false })
    }, 520)
  }
}

const prevGroup = () => {
  const N = groupedSlides.value.length
  const total = 2 * N
  if (total === 0) return
  if (currentGroup.value === 0) {
    carouselNoTransition.value = true
    currentGroup.value = total - 1
    nextTick(() => {
      requestAnimationFrame(() => {
        carouselNoTransition.value = false
        currentGroup.value = total - 2
      })
    })
  } else {
    currentGroup.value = currentGroup.value - 1
  }
}

function goToGroup(index: number) {
  currentGroup.value = index
}

let intervalId: ReturnType<typeof setInterval> | null = null
onMounted(() => {
  intervalId = setInterval(nextGroup, siteData.ourSpace.carousel.autoSlideInterval)
})
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

const currentAnnouncementIndex = ref(0)
const announcements = computed(() => siteData.announcements.items)
const displayedAnnouncements = computed(() => {
  const items = announcements.value
  const current = currentAnnouncementIndex.value
  const result: typeof items = []
  for (let i = -2; i <= 2; i++) {
    const index = (current + i + items.length) % items.length
    result.push(items[index])
  }
  return result
})
const nextAnnouncement = () => {
  currentAnnouncementIndex.value = (currentAnnouncementIndex.value + 1) % announcements.value.length
}
const prevAnnouncement = () => {
  currentAnnouncementIndex.value = (currentAnnouncementIndex.value - 1 + announcements.value.length) % announcements.value.length
}

const showAnnouncementModal = ref(false)
const selectedAnnouncement = ref<{ id: string; title: string; image: string; description?: string } | null>(null)
function openAnnouncementModal(announcement: { id: string; title: string; image: string; description?: string }) {
  selectedAnnouncement.value = announcement
  showAnnouncementModal.value = true
}

const openFaqIndex = ref<number | null>(null)
const toggleFaq = (index: number) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}
</script>

<style scoped>
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.animate-marquee {
  display: flex;
  animation: marquee 10s linear infinite;
  will-change: transform;
}
</style>
