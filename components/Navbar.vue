<template>
  <nav class="bg-workflow-green sticky top-0 z-50 shadow-md">
    <div class="max-w-[1440px] mx-auto px-6 lg:px-10 h-[74px] flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center gap-2 shrink-0">
        <span class="text-white text-4xl font-bold">W</span>
        <span class="text-white text-3xl">♥</span>
      </div>

      <!-- Links -->
      <ul class="hidden md:flex items-center gap-8 lg:gap-10 text-white uppercase font-medium tracking-wider">
        <li><NuxtLink to="/" class="hover:text-white/85 transition">Home</NuxtLink></li>
        <li><NuxtLink to="/about" class="hover:text-white/85 transition">About</NuxtLink></li>
        <li><NuxtLink to="/our-space" class="hover:text-white/85 transition">Our Space</NuxtLink></li>
        <li><NuxtLink to="/menu" class="hover:text-white/85 transition">Menu</NuxtLink></li>
        <li><NuxtLink to="/announcements" class="hover:text-white/85 transition">Announcements</NuxtLink></li>
      </ul>

      <!-- Contact Us Button - fixed 150×40 -->
      <NuxtLink
        to="/contact"
        class="
          bg-white 
          text-workflow-green 
          font-semibold 
          uppercase 
          tracking-wide 
          text-base
          w-[150px]
          h-[40px]
          flex items-center justify-center
          rounded-full 
          hover:bg-gray-100 
          transition 
          shadow-md 
          hover:shadow-lg
        "
      >
        Contact Us
      </NuxtLink>
    </div>
  </nav>
</template>