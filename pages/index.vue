<!-- pages/index.vue -->
<template>
  <div class="min-h-screen bg-gray-50 font-poppins">
    <!-- Hero Section (as before, close to navbar) -->
    <section class="relative h-[90vh] min-h-[680px] flex flex-col justify-start pt-6 sm:pt-8 md:pt-10 overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="/images/heropic.png"
          alt="Workflow Coworking Space interior"
          class="w-full h-full object-cover brightness-100"
        />
        <div class="absolute inset-0 bg-black/30"></div>
      </div>

      <div class="relative z-10 text-center px-5 sm:px-8 md:px-12 lg:px-16 max-w-5xl mx-auto mt-2 sm:mt-4">
        <h5 class="text-sm sm:text-base md:text-lg font-medium uppercase tracking-widest text-black mb-2 md:mb-3">
          Workflow Coworking Space
        </h5>
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 md:mb-4 text-black drop-shadow-lg">
          Your best work gets done <span class="text-workflow-green">here.</span>
        </h1>
        <p class="text-sm sm:text-base md:text-lg text-black/95 font-medium max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed drop-shadow">
          The first ever coworking space and study hub in Ozamiz City and Misamis Occidental
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <button class="bg-workflow-green text-white font-semibold text-sm sm:text-base px-8 py-3 sm:py-4 rounded-full uppercase tracking-wider hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">
            ORDER NOW
          </button>
          <button class="bg-transparent text-white font-semibold text-sm sm:text-base px-8 py-3 sm:py-4 rounded-full uppercase tracking-wider border-2 border-white hover:bg-white hover:text-workflow-green transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">
            BOOK OUR SPACE
          </button>
        </div>
      </div>
    </section>

    <!-- About Us Section - appears right after hero on scroll -->
    <section class="py-16 md:py-24 bg-white">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Left: Text -->
          <div class="space-y-6 md:space-y-8 text-center lg:text-left">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              About us
            </h2>

            <p class="text-lg md:text-xl text-gray-700 leading-relaxed">
              Made by the passionate, for the passionate.<br />
              Workflow Coworking Space is the first ever hub in the heart of Ozamiz City and Misamis Occidental, designed to inspire productivity and collaboration.
            </p>

            <p class="text-lg md:text-xl text-gray-700 leading-relaxed">
              We provide a welcoming space for freelancers, students, and entrepreneurs to work, connect, and grow together.
            </p>

            <div class="mt-8">
              <button
                class="
                  bg-workflow-green 
                  text-white 
                  font-semibold 
                  text-base md:text-lg 
                  px-10 py-4 
                  rounded-full 
                  uppercase 
                  tracking-wider 
                  hover:bg-green-700 
                  transition-all duration-300 
                  shadow-lg hover:shadow-xl hover:-translate-y-1
                "
              >
                LEARN MORE
              </button>
            </div>
          </div>

          <!-- Right: Image with optional overlay text/logo -->
          <div class="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/images/about.jpeg"  
              alt="Workflow Coworking Space - people working together with Workflow sign"
              class="w-full h-auto object-cover aspect-[4/3] md:aspect-auto"
            />
            <!-- Optional semi-transparent logo overlay (like in your description) -->
            <div class="absolute bottom-6 left-6 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full font-bold text-workflow-green text-lg shadow-md">
              workflow coworking
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// No script needed
</script>