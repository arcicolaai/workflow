<!-- pages/index.vue -->
<template>
  <div class="min-h-screen bg-gray-50 font-poppins">
    <!-- Hero Section -->
    <section
      id="hero"
      class="relative h-[90vh] min-h-[680px] flex flex-col justify-start pt-6 sm:pt-8 md:pt-10 overflow-hidden"
    >
      <div class="absolute inset-0">
        <img
          :src="siteData.hero.backgroundImage"
          :alt="siteData.hero.backgroundImageAlt"
          class="w-full h-full object-cover brightness-100"
        />
        <div class="absolute inset-0"></div>
      </div>

      <div class="relative z-10 text-center px-6 lg:px-12 max-w-5xl mx-auto mt-2 sm:mt-4 font-poppins">
        <h5 class="text-sm sm:text-base md:text-lg font-medium font-poppins uppercase tracking-widest text-black mb-2 md:mb-3">
          {{ siteData.hero.subtitle }}
        </h5>
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-poppins leading-tight mb-3 md:mb-4 text-black drop-shadow-lg">
          {{ siteData.hero.title }} <span class="text-workflow-green">{{ siteData.hero.titleHighlight }}</span>
        </h1>
        <p class="text-sm sm:text-base md:text-lg text-black/95 font-medium font-poppins max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed drop-shadow">
          {{ siteData.hero.description }}
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <button
              v-for="(button, index) in siteData.hero.buttons"
              :key="index"
              :class="[
                'font-semibold font-poppins text-sm sm:text-base px-8 py-3 sm:py-4 rounded-full uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5',
                button.type === 'primary' 
                  ? 'bg-workflow-green text-white hover:bg-green-700' 
                  : 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-workflow-green'
              ]"
            >
              {{ button.text }}
            </button>
        </div>
      </div>
    </section>

    <!-- About Us Section -->
    <section id="about" class="py-16 md:py-24 bg-white scroll-mt-20 font-poppins">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div class="text-center lg:text-left font-poppins">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins mb-6 md:mb-8" :style="{ color: siteData.about.titleColor }">
              {{ siteData.about.title }}
            </h2>
            <p 
              v-for="(paragraph, index) in siteData.about.paragraphs" 
              :key="index"
              class="text-lg md:text-xl leading-relaxed font-poppins mb-4 md:mb-6" 
              :style="{ color: siteData.about.textColor }"
            >
              <span v-html="paragraph.replace(/\n/g, '<br />')"></span>
            </p>
            <div class="mt-8 md:mt-10">
              <button
                class="text-white font-semibold font-poppins text-base md:text-lg px-10 py-4 rounded-full uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                :style="{ backgroundColor: siteData.about.buttonColor }"
                @mouseover="this.style.backgroundColor = siteData.about.buttonHoverColor"
                @mouseleave="this.style.backgroundColor = siteData.about.buttonColor"
              >
                {{ siteData.about.button.text }}
              </button>
            </div>
          </div>
          <div class="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              :src="siteData.about.image"
              :alt="siteData.about.imageAlt"
              class="w-full h-auto object-cover aspect-[4/3] md:aspect-auto"
            />
            <div
              class="absolute bottom-6 left-6 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full font-bold font-poppins text-workflow-green text-lg shadow-md"
            >
              {{ siteData.about.overlayText }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Marquee Bar -->
    <div class="bg-workflow-green py-3 md:py-4 overflow-hidden font-poppins">
      <div class="relative">
        <div class="animate-marquee whitespace-nowrap flex items-center">
          <div 
            v-for="n in 2" 
            :key="n"
            class="inline-flex items-center gap-10 md:gap-16 lg:gap-24 px-8 md:px-12 text-white text-base md:text-lg font-medium font-poppins uppercase tracking-wider"
          >
            <div 
              v-for="(feature, index) in siteData.features" 
              :key="index"
              class="flex items-center gap-3 min-w-max"
            >
              <div class="rounded-full bg-white/20 p-2.5">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    v-if="feature.icon === 'wifi'"
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M13 10V3L4 14h7v7l9-11h-7z" 
                  />
                  <template v-else-if="feature.icon === 'outlet'">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5v14" />
                  </template>
                  <path 
                    v-else-if="feature.icon === 'ac'"
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" 
                  />
                  <template v-else-if="feature.icon === 'chair'">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-3-4H7L4 7m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2V7m16 0H4" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 10h12M6 14h12" />
                  </template>
                </svg>
              </div>
              <span>{{ feature.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Our Space Section -->
    <section class="py-16 md:py-24 bg-white font-poppins">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-workflow-green mb-6 md:mb-8">
          {{ siteData.ourSpace.title }}
        </h2>
        <p class="text-lg md:text-xl text-gray-700 font-poppins leading-relaxed max-w-4xl mx-auto mb-10 md:mb-12">
          {{ siteData.ourSpace.description }}
        </p>

        <button
          class="bg-workflow-green text-white font-semibold font-poppins text-base md:text-lg px-12 py-4 rounded-full uppercase tracking-wider hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 mx-auto block mb-12 md:mb-16"
        >
          {{ siteData.ourSpace.button.text }}
        </button>

        <!-- Carousel -->
        <div class="relative max-w-6xl mx-auto">
          <div class="overflow-hidden rounded-2xl shadow-2xl">
            <div
              class="flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(-${currentGroup * 100}%)` }"
            >
              <!-- Group Wrapper -->
              <div
                v-for="(group, groupIndex) in groupedSlides"
                :key="groupIndex"
                class="w-full flex-shrink-0 grid grid-cols-2 md:grid-cols-4 gap-4 p-4"
              >
                <img
                  v-for="(slide, index) in group"
                  :key="index"
                  :src="slide"
                  class="w-full h-60 object-cover rounded-xl"
                  :alt="`Space image ${groupIndex * siteData.ourSpace.carousel.itemsPerGroup + index + 1}`"
                />
              </div>
            </div>
          </div>

          <!-- Prev -->
          <button
            @click="prevGroup"
            class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-4 rounded-full hover:bg-black/60 transition z-10"
          >
            ←
          </button>

          <!-- Next -->
          <button
            @click="nextGroup"
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-4 rounded-full hover:bg-black/60 transition z-10"
          >
            →
          </button>

          <!-- Dots -->
          <div class="flex justify-center gap-3 mt-6">
            <button
              v-for="(_, index) in groupedSlides"
              :key="index"
              @click="currentGroup = index"
              :class="[
                'w-3 h-3 rounded-full transition-all',
                currentGroup === index
                  ? 'bg-workflow-green scale-125'
                  : 'bg-gray-400'
              ]"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- Service Features Bar -->
    <div class="max-w-[800px] mx-auto px-2 lg:px-4 py-2 md:py-3 font-poppins">
      <div 
        class="py-3 md:py-4 px-4 lg:px-6 font-poppins"
        style="background-color: #7B7557; border-radius: 50px;"
      >
        <div class="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 lg:gap-6">
          <div 
            v-for="(feature, index) in siteData.serviceFeatures" 
            :key="index"
            class="flex items-center gap-2"
          >
            <div class="rounded-full bg-white p-1.5 flex items-center justify-center">
              <svg 
                v-if="feature.icon === 'chef'"
                class="w-5 h-5" 
                fill="none" 
                stroke="#4B5563" 
                viewBox="0 0 24 24"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M12 4v16m0-16c-2 0-4 1-4 3v1h8V7c0-2-2-3-4-3zm0 0V2m0 2c2 0 4 1 4 3v1h-8V7c0-2 2-3 4-3z" 
                />
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M8 8h8M8 12h8M8 16h8" 
                />
              </svg>
              <svg 
                v-else-if="feature.icon === 'basket'"
                class="w-5 h-5" 
                fill="none" 
                stroke="#4B5563" 
                viewBox="0 0 24 24"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              <svg 
                v-else-if="feature.icon === 'lightbulb'"
                class="w-5 h-5" 
                fill="none" 
                stroke="#4B5563" 
                viewBox="0 0 24 24"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                />
              </svg>
            </div>
            <span class="text-white font-poppins font-bold text-sm md:text-base uppercase tracking-wide">
              {{ feature.name }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Best-Selling Items Section -->
    <section class="my-[55px] bg-white font-poppins">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 md:py-20">
        <!-- Title -->
        <div class="text-center mb-8 md:mb-10">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins">
            <span style="color: #7B7557;">{{ siteData.bestSellingItems.title.prefix }}</span>
            <span class="text-workflow-green"> {{ siteData.bestSellingItems.title.highlight }}</span>
            <span style="color: #7B7557;"> {{ siteData.bestSellingItems.title.suffix }}</span>
          </h2>
        </div>

        <!-- Description -->
        <p class="text-base md:text-lg lg:text-xl text-gray-700 font-poppins leading-relaxed max-w-4xl mx-auto text-justify mb-14 md:mb-20 px-4 md:px-6" style="text-indent: 2em;">
          {{ siteData.bestSellingItems.description }}
        </p>

        <!-- Product Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20 max-w-4xl mx-auto px-4 md:px-6" style="padding-left: 2em;">
          <div
            v-for="(item, index) in siteData.bestSellingItems.items"
            :key="index"
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            <!-- Product Image -->
            <div class="w-full h-56 md:h-64 bg-gray-200 overflow-hidden">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover"
              />
            </div>
            
            <!-- Product Info -->
            <div class="p-4 md:p-5 flex flex-col flex-grow">
              <h3 class="text-sm md:text-base font-bold font-poppins text-gray-900 mb-1.5">
                {{ item.name }}
              </h3>
              <p class="text-base md:text-lg font-bold font-poppins text-workflow-green mb-2">
                {{ item.price }}
              </p>
              <p class="text-xs text-gray-600 font-poppins mb-3 leading-relaxed flex-grow text-justify" style="text-indent: 1.5em;">
                {{ item.description }}
              </p>
              <button
                class="w-full bg-workflow-green text-white font-semibold font-poppins py-1.5 px-3 rounded-lg hover:bg-green-700 transition-colors duration-300 uppercase tracking-wide text-xs mt-auto"
                style="background-color: #7B7557;"
                @mouseover="$event.currentTarget.style.backgroundColor = '#5E5A45'"
                @mouseleave="$event.currentTarget.style.backgroundColor = '#7B7557'"
              >
                Add to Order
              </button>
            </div>
          </div>
        </div>

        <!-- View Menu Button -->
        <div class="text-center mt-8 md:mt-12">
          <button
            class="bg-workflow-green text-white font-semibold font-poppins text-lg md:text-xl px-14 py-5 rounded-full uppercase tracking-wider hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            style="background-color: #7B7557;"
            @mouseover="$event.currentTarget.style.backgroundColor = '#5E5A45'"
            @mouseleave="$event.currentTarget.style.backgroundColor = '#7B7557'"
          >
            {{ siteData.bestSellingItems.viewMenuButton.text }}
          </button>
        </div>
      </div>
    </section>

    <!-- Announcements Section -->
    <section class="my-[55px] bg-gray-50 font-poppins py-16 md:py-20">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <!-- Title -->
        <div class="text-center mb-12 md:mb-16">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-workflow-green">
            {{ siteData.announcements.title }}
          </h2>
        </div>

        <!-- Centered Coverflow-Style Carousel -->
        <div class="flex justify-center items-center relative overflow-x-auto overflow-y-visible pb-12 px-4 md:px-8">
          <div class="flex items-end justify-center relative mx-auto">
            <!-- Card Order: Small – Medium – Large – Medium – Small (all same base size, scaled differently) -->
            <div
              v-for="(announcement, displayIndex) in displayedAnnouncements"
              :key="`${announcement.id}-${currentAnnouncementIndex}`"
              class="relative transition-all duration-500 ease-out hover:scale-105 hover:z-50"
              :style="{
                transform: displayIndex === 0 || displayIndex === 4
                  ? 'scale(0.65)' 
                  : displayIndex === 1 || displayIndex === 3
                  ? 'scale(0.80)'
                  : 'scale(1)',
                zIndex: displayIndex === 2 ? 30 : displayIndex === 1 || displayIndex === 3 ? 20 : 10,
                opacity: displayIndex === 2 ? 1 : displayIndex === 1 || displayIndex === 3 ? 0.88 : 0.75,
                marginRight: displayIndex === 0 || displayIndex === 3 ? '-45px' : displayIndex < displayedAnnouncements.length - 1 ? '-5px' : '0'
              }"
              :class="{
                // All cards have the same base size
                'w-[140px] md:w-[170px] lg:w-[200px] h-[210px] md:h-[255px] lg:h-[300px]': true
              }"
            >
              <div class="bg-white rounded-xl shadow-2xl overflow-hidden h-full w-full transform transition-all duration-500 ease-out hover:shadow-3xl border-2 border-white/50">
                <img
                  :src="announcement.image"
                  :alt="announcement.title"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <!-- Previous Button -->
          <button
            @click="prevAnnouncement"
            class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-workflow-green text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 z-50"
            style="background-color: #7B7557;"
            @mouseover="$event.currentTarget.style.backgroundColor = '#5E5A45'"
            @mouseleave="$event.currentTarget.style.backgroundColor = '#7B7557'"
            aria-label="Previous announcement"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <!-- Next Button -->
          <button
            @click="nextAnnouncement"
            class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-workflow-green text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 z-50"
            style="background-color: #7B7557;"
            @mouseover="$event.currentTarget.style.backgroundColor = '#5E5A45'"
            @mouseleave="$event.currentTarget.style.backgroundColor = '#7B7557'"
            aria-label="Next announcement"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="my-[55px] bg-white font-poppins py-16 md:py-20">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <!-- Title -->
        <div class="text-center mb-12 md:mb-16">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins" style="color: #7B7557;">
            {{ siteData.faq.title }}
          </h2>
        </div>

        <!-- FAQ Accordion -->
        <div class="max-w-4xl mx-auto space-y-4">
          <div
            v-for="(item, index) in siteData.faq.items"
            :key="item.id"
            class="border border-gray-200 overflow-hidden"
            style="border-radius: 0;"
          >
            <!-- Question Header -->
            <button
              @click="toggleFaq(index)"
              class="w-full text-white font-semibold font-poppins text-left px-6 py-4 flex items-center justify-between hover:bg-green-700 transition-colors duration-300"
              style="background-color: #7B7557; border-radius: 0;"
              @mouseover="$event.currentTarget.style.backgroundColor = '#5E5A45'"
              @mouseleave="$event.currentTarget.style.backgroundColor = '#7B7557'"
            >
              <span class="text-base md:text-lg">{{ item.question }}</span>
              <svg
                class="w-5 h-5 transition-transform duration-300 flex-shrink-0 ml-4"
                :class="{ 'rotate-180': openFaqIndex === index }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Answer Content -->
            <div
              v-show="openFaqIndex === index"
              class="bg-amber-50 px-6 py-4 text-gray-700 font-poppins text-sm md:text-base leading-relaxed"
            >
              {{ item.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Us Section -->
    <section class="my-[55px] font-poppins py-16 md:py-20 relative" :style="{ backgroundImage: `url(${siteData.contact.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }">
      <div class="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <!-- Contact Form Section -->
          <div style="padding-left: 2em; padding-right: 2em;">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins mb-8" style="color: #7B7557;">
              {{ siteData.contact.title }}
            </h2>
            
            <form class="space-y-4">
              <!-- Firstname and Lastname -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 font-poppins mb-2">
                    {{ siteData.contact.form.firstName.label }}
                  </label>
                  <input
                    type="text"
                    :placeholder="siteData.contact.form.firstName.placeholder"
                    class="w-full px-4 py-3 border-2 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-workflow-green bg-white"
                    style="border-color: #7B7557;"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 font-poppins mb-2">
                    {{ siteData.contact.form.lastName.label }}
                  </label>
                  <input
                    type="text"
                    :placeholder="siteData.contact.form.lastName.placeholder"
                    class="w-full px-4 py-3 border-2 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-workflow-green bg-white"
                    style="border-color: #7B7557;"
                  />
                </div>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 font-poppins mb-2">
                  {{ siteData.contact.form.email.label }}
                </label>
                <input
                  type="email"
                  :placeholder="siteData.contact.form.email.placeholder"
                  class="w-full px-4 py-3 border-2 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-workflow-green bg-white"
                  style="border-color: #7B7557;"
                />
              </div>

              <!-- Contact Number -->
              <div>
                <label class="block text-sm font-medium text-gray-700 font-poppins mb-2">
                  {{ siteData.contact.form.phone.label }}
                </label>
                <input
                  type="tel"
                  :placeholder="siteData.contact.form.phone.placeholder"
                  class="w-full px-4 py-3 border-2 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-workflow-green bg-white"
                  style="border-color: #7B7557;"
                />
              </div>

              <!-- Subject -->
              <div>
                <label class="block text-sm font-medium text-gray-700 font-poppins mb-2">
                  {{ siteData.contact.form.subject.label }}
                </label>
                <input
                  type="text"
                  :placeholder="siteData.contact.form.subject.placeholder"
                  class="w-full px-4 py-3 border-2 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-workflow-green bg-white"
                  style="border-color: #7B7557;"
                />
              </div>

              <!-- Message -->
              <div>
                <label class="block text-sm font-medium text-gray-700 font-poppins mb-2">
                  {{ siteData.contact.form.message.label }}
                </label>
                <textarea
                  :placeholder="siteData.contact.form.message.placeholder"
                  rows="6"
                  class="w-full px-4 py-3 border-2 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-workflow-green resize-none bg-white"
                  style="border-color: #7B7557;"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                class="w-full bg-workflow-green text-white font-semibold font-poppins py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300 uppercase tracking-wide"
                style="background-color: #7B7557;"
                @mouseover="$event.currentTarget.style.backgroundColor = '#5E5A45'"
                @mouseleave="$event.currentTarget.style.backgroundColor = '#7B7557'"
              >
                Send Message
              </button>
            </form>
          </div>

          <!-- Map and Building Image Section -->
          <div class="space-y-4">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins mb-8" style="color: #7B7557;">
              {{ siteData.contact.map.title }}
            </h2>
            
            <!-- Map Embed -->
            <div class="w-full h-96 md:h-[400px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                :src="siteData.contact.map.embedUrl"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <!-- Building Image -->
            <div class="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
              <img
                :src="siteData.contact.buildingImage"
                alt="Workflow Coworking Space Building"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Section -->
    <footer class="bg-workflow-green text-white font-poppins" style="background-color: #7B7557;">
      <!-- Main Footer Content -->
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 md:py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <!-- Logo and Brand Information -->
          <div>
            <div class="mb-4">
              <img 
                :src="siteData.footer.logo.image" 
                alt="Workflow Logo" 
                class="h-12 w-12 md:h-16 md:w-16 object-contain mb-4"
              />
            </div>
            <h3 class="text-base md:text-lg font-bold font-poppins uppercase mb-3">
              {{ siteData.footer.logo.text }}
            </h3>
            <div class="text-sm md:text-base text-white/90 font-poppins leading-relaxed">
              <p>Your Coworking Space and Cafe in</p>
              <p>Ozamiz City and Misamis Occidental</p>
            </div>
          </div>

          <!-- Sitemap -->
          <div>
            <h4 class="text-base md:text-lg font-bold font-poppins mb-4">
              {{ siteData.footer.sitemap.title }}
            </h4>
            <ul class="space-y-2">
              <li v-for="(link, index) in siteData.footer.sitemap.links" :key="index">
                <NuxtLink
                  :to="link.to"
                  class="text-sm md:text-base text-white/90 font-poppins hover:text-white transition-colors duration-300 block"
                >
                  {{ link.text }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Location -->
          <div>
            <h4 class="text-base md:text-lg font-bold font-poppins mb-4">
              {{ siteData.footer.location.title }}
            </h4>
            <div class="text-sm md:text-base text-white/90 font-poppins leading-relaxed">
              <p>Workflow Coworking Space, 2/F Infinity Business Center,</p>
              <p>Bernad Avenue, Aguada, Ozamiz City, 7200 Misamis Occidental,</p>
              <p>Philippines</p>
            </div>
          </div>

          <!-- Business Hours -->
          <div>
            <h4 class="text-base md:text-lg font-bold font-poppins mb-4">
              {{ siteData.footer.businessHours.title }}
            </h4>
            <ul class="space-y-2">
              <li 
                v-for="(hour, index) in siteData.footer.businessHours.hours" 
                :key="index"
                class="text-sm md:text-base text-white/90 font-poppins"
              >
                {{ hour }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Footer Strip -->
      <div class="border-t border-white/20">
        <div class="max-w-[1440px] mx-auto px-6 lg:px-12 py-4 flex items-center justify-center">
          <p class="text-sm md:text-base text-white/90 font-poppins">
            {{ siteData.footer.poweredBy }}
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const { siteData } = useSiteData()

const slides = computed(() => siteData.ourSpace.images)
const currentGroup = ref(0)
const itemsPerGroup = computed(() => siteData.ourSpace.carousel.itemsPerGroup)

// Announcements carousel
const currentAnnouncementIndex = ref(0)
const announcements = computed(() => siteData.announcements.items)

const displayedAnnouncements = computed(() => {
  const items = announcements.value
  const current = currentAnnouncementIndex.value
  const result = []
  
  // Create array with 5 cards: 2 before, current, 2 after
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

// FAQ Accordion
const openFaqIndex = ref(null)

const toggleFaq = (index) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

// Group slides into sets
const groupedSlides = computed(() => {
  const groups = []
  for (let i = 0; i < slides.value.length; i += itemsPerGroup.value) {
    groups.push(slides.value.slice(i, i + itemsPerGroup.value))
  }
  return groups
})

const nextGroup = () => {
  currentGroup.value =
    (currentGroup.value + 1) % groupedSlides.value.length
}

const prevGroup = () => {
  currentGroup.value =
    (currentGroup.value - 1 + groupedSlides.value.length) %
    groupedSlides.value.length
}

let intervalId = null

onMounted(() => {
  intervalId = setInterval(nextGroup, siteData.ourSpace.carousel.autoSlideInterval)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
/* Marquee animation */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.animate-marquee {
  display: flex;
  animation: marquee 10s linear infinite;
  will-change: transform;
}
</style>
