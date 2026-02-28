<template>
  <header class="sticky top-0 z-50 shadow-md bg-palette-sage font-poppins border-b border-palette-brown/20">
    <nav class="relative container mx-auto px-4 sm:px-[55px] py-4 flex items-center justify-between font-poppins">
      <NuxtLink to="/" class="flex items-center shrink-0 min-w-[2.25rem] h-9" aria-label="Workflow Coworking Space Home">
        <img
          :src="siteData.footer.logo.image"
          alt="Workflow Coworking Space"
          class="h-9 w-auto max-h-9 object-contain"
        />
      </NuxtLink>

      <!-- Desktop nav (hidden on small screens) -->
      <div class="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-8">
        <NuxtLink to="/" class="uppercase text-sm font-bold text-palette-white hover:opacity-90">Home</NuxtLink>
        <NuxtLink to="/about" class="uppercase text-sm font-bold text-palette-white hover:opacity-90">About</NuxtLink>
        <NuxtLink to="/venues" class="uppercase text-sm font-bold text-palette-white hover:opacity-90">Our Space</NuxtLink>
        <NuxtLink to="/menu" class="uppercase text-sm font-bold text-palette-white hover:opacity-90">Menu</NuxtLink>
        <NuxtLink to="/announcements" class="uppercase text-sm font-bold text-palette-white hover:opacity-90">Announcements</NuxtLink>
      </div>

      <!-- Cart (Menu/Cart pages only) or Contact Us (rest) - desktop -->
      <div class="hidden lg:block">
        <NuxtLink
          v-if="showCartInNav"
          to="/cart"
          class="relative inline-flex items-center gap-2 rounded-full bg-palette-cream px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-palette-brown shadow-sm transition-opacity hover:opacity-90"
          style="background-color: #FFF6EF; color: #59543E;"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
          Cart
          <span v-if="itemCount > 0" class="absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1 flex items-center justify-center rounded-full bg-palette-brown text-palette-white text-xs font-bold">
            {{ itemCount }}
          </span>
        </NuxtLink>
        <NuxtLink
          v-else
          to="/contact"
          class="inline-flex items-center gap-2 rounded-full bg-palette-cream px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-palette-brown shadow-sm transition-opacity hover:opacity-90"
          style="background-color: #FFF6EF; color: #59543E;"
        >
          Contact Us
        </NuxtLink>
      </div>

      <!-- Hamburger button (mobile only) -->
      <button
        type="button"
        class="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-palette-white hover:bg-white/10 transition-colors"
        aria-label="Toggle menu"
        aria-expanded="isMenuOpen"
        @click="isMenuOpen = !isMenuOpen"
      >
        <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </nav>

    <!-- Mobile menu (slide-down panel) -->
    <Transition name="mobile-menu">
      <div
        v-show="isMenuOpen"
        class="lg:hidden absolute left-0 right-0 top-full bg-palette-sage border-t border-white/20 shadow-lg overflow-hidden"
        style="background-color: #69AC7C;"
      >
        <div class="container mx-auto px-4 py-4 flex flex-col gap-1">
          <NuxtLink to="/" class="nav-mobile-link" @click="closeMenu">Home</NuxtLink>
          <NuxtLink to="/about" class="nav-mobile-link" @click="closeMenu">About</NuxtLink>
          <NuxtLink to="/venues" class="nav-mobile-link" @click="closeMenu">Our Space</NuxtLink>
          <NuxtLink to="/menu" class="nav-mobile-link" @click="closeMenu">Menu</NuxtLink>
          <NuxtLink to="/announcements" class="nav-mobile-link" @click="closeMenu">Announcements</NuxtLink>
          <NuxtLink
            v-if="showCartInNav"
            to="/cart"
            class="nav-mobile-link mt-2 pt-3 border-t border-white/20 flex items-center gap-2"
            @click="closeMenu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            Cart
            <span v-if="itemCount > 0" class="ml-1 min-w-[1.25rem] h-5 px-1 inline-flex items-center justify-center rounded-full bg-palette-brown text-palette-white text-xs font-bold">
              {{ itemCount }}
            </span>
          </NuxtLink>
          <NuxtLink
            v-else
            to="/contact"
            class="nav-mobile-link mt-2 pt-3 border-t border-white/20"
            @click="closeMenu"
          >
            Contact Us
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const { siteData } = useSiteData()
const { itemCount } = useCart()
const isMenuOpen = ref(false)

// Show Cart in nav only on Menu and Cart pages; rest show Contact Us
const showCartInNav = computed(() => {
  const path = route.path
  return path === '/menu' || path === '/cart'
})

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<style scoped>
.nav-mobile-link {
  @apply block py-3 px-2 uppercase text-sm font-bold text-palette-white hover:bg-white/10 rounded-lg transition-colors;
}
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
