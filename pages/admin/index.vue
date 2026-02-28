<template>
  <div class="min-h-full bg-palette-cream/40">
    <!-- Welcome header -->
    <header class="bg-palette-white border-b border-palette-olive/15 shadow-sm">
      <div class="px-6 lg:px-8 py-6 sm:py-8">
        <h1 class="font-heading text-2xl sm:text-3xl font-bold text-palette-brown">
          {{ adminData.welcome.title }}
        </h1>
        <p class="mt-1 text-sm text-palette-brown/70">
          Manage your site content, menu, venues, and bookings from here.
        </p>
      </div>
    </header>

    <div class="px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      <!-- Stats overview -->
      <section>
        <h2 class="text-sm font-semibold uppercase tracking-wider text-palette-brown/70 mb-4">
          Overview
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div
            v-for="(card, index) in adminData.summaryCards"
            :key="index"
            class="group bg-palette-white rounded-xl border border-palette-olive/20 shadow-sm hover:shadow-md hover:border-palette-olive/30 transition-all duration-200 overflow-hidden"
          >
            <div class="p-5 sm:p-6 flex items-start justify-between gap-4">
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-palette-brown/80">{{ card.title }}</p>
                <p class="mt-1 font-heading text-2xl sm:text-3xl font-bold text-palette-dark tabular-nums">
                  {{ cardDisplayValue(card) }}
                </p>
              </div>
              <div
                class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                :style="{ backgroundColor: card.iconBgColor }"
              >
                <svg v-if="card.icon === 'items'" class="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24" :style="{ color: card.iconColor }" aria-hidden="true">
                  <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <svg v-else-if="card.icon === 'venues'" class="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" :style="{ color: card.iconColor }" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <svg v-else-if="card.icon === 'bookings'" class="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" :style="{ color: card.iconColor }" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span v-else class="w-6 h-6 rounded" :style="{ backgroundColor: card.iconColor }" />
              </div>
            </div>
            <NuxtLink
              v-if="cardLink(card)"
              :to="cardLink(card)!"
              class="block px-5 sm:px-6 py-3 text-sm font-medium text-palette-sage hover:bg-palette-sage/5 transition-colors border-t border-palette-olive/10"
            >
              View all →
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Quick actions -->
      <section>
        <h2 class="text-sm font-semibold uppercase tracking-wider text-palette-brown/70 mb-4">
          Quick actions
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <NuxtLink
            to="/admin/content"
            class="flex items-center gap-4 p-4 sm:p-5 bg-palette-white rounded-xl border border-palette-olive/20 shadow-sm hover:shadow-md hover:border-palette-sage/40 hover:bg-palette-sage/5 transition-all duration-200 group"
          >
            <span class="w-11 h-11 rounded-xl bg-palette-sage/15 text-palette-sage flex items-center justify-center flex-shrink-0 group-hover:bg-palette-sage/25 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </span>
            <div class="min-w-0 flex-1">
              <span class="font-medium text-palette-brown group-hover:text-palette-dark">Site Content</span>
              <p class="text-xs text-palette-brown/60 mt-0.5">Edit copy & images</p>
            </div>
            <svg class="w-5 h-5 text-palette-olive/40 group-hover:text-palette-sage flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </NuxtLink>
          <NuxtLink
            to="/admin/menu-items"
            class="flex items-center gap-4 p-4 sm:p-5 bg-palette-white rounded-xl border border-palette-olive/20 shadow-sm hover:shadow-md hover:border-palette-sage/40 hover:bg-palette-sage/5 transition-all duration-200 group"
          >
            <span class="w-11 h-11 rounded-xl bg-palette-sage/15 text-palette-sage flex items-center justify-center flex-shrink-0 group-hover:bg-palette-sage/25 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </span>
            <div class="min-w-0 flex-1">
              <span class="font-medium text-palette-brown group-hover:text-palette-dark">Menu Items</span>
              <p class="text-xs text-palette-brown/60 mt-0.5">Manage menu & items</p>
            </div>
            <svg class="w-5 h-5 text-palette-olive/40 group-hover:text-palette-sage flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </NuxtLink>
          <NuxtLink
            to="/admin/venue"
            class="flex items-center gap-4 p-4 sm:p-5 bg-palette-white rounded-xl border border-palette-olive/20 shadow-sm hover:shadow-md hover:border-palette-sage/40 hover:bg-palette-sage/5 transition-all duration-200 group"
          >
            <span class="w-11 h-11 rounded-xl bg-palette-sage/15 text-palette-sage flex items-center justify-center flex-shrink-0 group-hover:bg-palette-sage/25 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </span>
            <div class="min-w-0 flex-1">
              <span class="font-medium text-palette-brown group-hover:text-palette-dark">Venue</span>
              <p class="text-xs text-palette-brown/60 mt-0.5">Spaces & availability</p>
            </div>
            <svg class="w-5 h-5 text-palette-olive/40 group-hover:text-palette-sage flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </NuxtLink>
          <NuxtLink
            to="/admin/bookings"
            class="flex items-center gap-4 p-4 sm:p-5 bg-palette-white rounded-xl border border-palette-olive/20 shadow-sm hover:shadow-md hover:border-palette-sage/40 hover:bg-palette-sage/5 transition-all duration-200 group"
          >
            <span class="w-11 h-11 rounded-xl bg-palette-sage/15 text-palette-sage flex items-center justify-center flex-shrink-0 group-hover:bg-palette-sage/25 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </span>
            <div class="min-w-0 flex-1">
              <span class="font-medium text-palette-brown group-hover:text-palette-dark">Bookings</span>
              <p class="text-xs text-palette-brown/60 mt-0.5">View & manage bookings</p>
            </div>
            <svg class="w-5 h-5 text-palette-olive/40 group-hover:text-palette-sage flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import adminDashboardData from '~/data/admin-dashboard.json'

definePageMeta({ layout: 'admin' })

const { flatItems } = useAdminMenu()
const { flatRows: venueRows } = useAdminVenues()
const { totalCount: totalBookings } = useAdminBookings()

const adminData = adminDashboardData as {
  welcome: { title: string }
  summaryCards: Array<{
    title: string
    value: number
    icon: string
    iconBgColor: string
    iconColor: string
  }>
}

const totalMenuItems = computed(() => flatItems.value.length)
const totalVenues = computed(() => venueRows.value.length)

function cardDisplayValue(card: { icon: string; value: number }) {
  if (card.icon === 'items') return totalMenuItems.value
  if (card.icon === 'venues') return totalVenues.value
  if (card.icon === 'bookings') return totalBookings.value
  return card.value
}

function cardLink(card: { icon: string }) {
  if (card.icon === 'items') return '/admin/menu-items'
  if (card.icon === 'venues') return '/admin/venue'
  if (card.icon === 'bookings') return '/admin/bookings'
  return null
}
</script>
