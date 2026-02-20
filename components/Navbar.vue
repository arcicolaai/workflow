<template>
  <nav class="bg-workflow-green sticky top-0 z-50 shadow-md font-poppins">
    <div class="max-w-[1440px] mx-auto px-6 lg:px-10 h-[65px] flex items-center justify-between relative">
      <!-- Logo -->
      <div class="flex items-center shrink-0 mr-8 md:mr-12">
        <img 
          :src="siteData.navigation.logo.image" 
          alt="Logo" 
          class="h-20 w-20 md:h-24 md:w-24 object-contain"
        />
      </div>

      <!-- Navigation Links (desktop) -->
      <ul class="hidden md:flex items-center gap-5 lg:gap-6 text-white uppercase font-medium font-poppins tracking-wide text-sm absolute left-1/2 transform -translate-x-1/2 -ml-16 md:-ml-20">
        <li v-for="(link, index) in siteData.navigation.links" :key="index">
          <NuxtLink
            :to="link.to"
            class="hover:text-white/85 transition font-poppins"
            active-class="underline"
          >
            {{ link.text }}
          </NuxtLink>
        </li>
      </ul>

      <!-- Mobile Menu Button -->
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="md:hidden text-white p-2"
        aria-label="Toggle menu"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Contact Us Button (desktop) -->
      <NuxtLink
        :to="siteData.navigation.contactButton.to"
        class="
          hidden
          md:flex
          bg-white
          text-workflow-green
          font-semibold
          font-poppins
          uppercase
          tracking-wide
          text-sm
          w-[120px]
          h-[32px]
          items-center justify-center
          rounded-full
          hover:bg-gray-100
          transition
          shadow-md
          hover:shadow-lg
        "
      >
        {{ siteData.navigation.contactButton.text }}
      </NuxtLink>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="mobileMenuOpen"
      class="md:hidden bg-workflow-green border-t border-white/20"
    >
      <ul class="flex flex-col py-3 px-6 gap-3">
        <li v-for="(link, index) in siteData.navigation.links" :key="index">
          <NuxtLink
            :to="link.to"
            class="block text-white uppercase font-medium font-poppins tracking-wide text-sm py-1.5 hover:text-white/85 transition"
            @click="mobileMenuOpen = false"
          >
            {{ link.text }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            :to="siteData.navigation.contactButton.to"
            class="block bg-white text-workflow-green font-semibold font-poppins uppercase tracking-wide text-sm py-2 px-5 rounded-full text-center hover:bg-gray-100 transition"
            @click="mobileMenuOpen = false"
          >
            {{ siteData.navigation.contactButton.text }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const { siteData } = useSiteData()
const mobileMenuOpen = ref(false)
</script>
