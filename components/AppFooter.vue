<template>
  <footer class="mt-auto font-poppins text-palette-white bg-palette-brown">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-10 md:py-12 lg:py-14">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
        <!-- Brand + logo -->
        <div class="flex flex-col gap-3 sm:gap-4">
          <NuxtLink to="/" class="inline-flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
            <img
              :src="siteData.footer.logo.image"
              alt="Workflow Coworking Space"
              class="h-7 sm:h-8 w-auto object-contain shrink-0"
            />
            <span class="font-bold text-palette-white uppercase tracking-tight text-sm leading-tight max-w-[200px] sm:max-w-[140px]">
              {{ siteData.footer.logo.text }}
            </span>
          </NuxtLink>
          <p class="text-sm text-palette-white/85 leading-relaxed max-w-sm">
            {{ siteData.footer.logo.tagline }}
          </p>
        </div>

        <!-- Sitemap + Location -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:col-span-2 lg:gap-x-10 lg:ml-4">
          <div class="flex flex-col">
            <h3 class="font-semibold text-palette-white text-sm uppercase tracking-wide mb-2 sm:mb-3">
              {{ siteData.footer.sitemap.title }}
            </h3>
            <ul class="space-y-1.5 sm:space-y-2 text-sm text-palette-white/85">
              <li v-for="link in siteData.footer.sitemap.links" :key="link.text">
                <NuxtLink
                  :to="link.to"
                  class="hover:text-palette-white hover:underline transition-colors inline-block"
                >
                  {{ link.text }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div class="flex flex-col">
            <h3 class="font-semibold text-palette-white text-sm uppercase tracking-wide mb-2 sm:mb-3">
              {{ siteData.footer.location.title }}
            </h3>
            <p class="text-sm text-palette-white/85 leading-relaxed mt-0">
              {{ siteData.footer.location.address }}
            </p>
          </div>
        </div>

        <!-- Business hours -->
        <div class="flex flex-col lg:col-span-1">
          <h3 class="font-semibold text-palette-white text-sm uppercase tracking-wide mb-2 sm:mb-3">
            {{ siteData.footer.businessHours.title }}
          </h3>
          <ul class="space-y-1.5 sm:space-y-2 text-sm text-palette-white/85">
            <li v-for="(line, i) in siteData.footer.businessHours.hours" :key="i">
              {{ line }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="border-t border-palette-white/15 py-3 sm:py-4 bg-palette-dark">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <p class="text-xs sm:text-sm text-palette-white/80">
          {{ siteData.footer.poweredBy }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { siteData } = useSiteData()
</script>
