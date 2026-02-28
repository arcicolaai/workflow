<template>
  <div class="min-h-screen flex antialiased font-poppins bg-palette-cream">
    <!-- Sidebar: fixed so it stays visible when scrolling -->
    <aside class="fixed inset-y-0 left-0 z-20 w-56 flex flex-col text-palette-cream bg-palette-sage shadow-xl">
      <NuxtLink to="/admin" class="flex items-center gap-2 px-6 py-5 border-b border-palette-cream/20">
        <img
          v-if="adminData.sidebar.logoImage"
          :src="adminData.sidebar.logoImage"
          :alt="adminData.sidebar.logoAlt"
          class="w-8 h-8 object-contain"
        />
        <span v-else class="w-8 h-8 rounded flex items-center justify-center bg-palette-cream/20" aria-hidden="true">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 18V6l4 6 4-6v12" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span class="font-heading font-semibold text-sm uppercase tracking-wide">WORKFLOW</span>
      </NuxtLink>
      <p class="px-6 py-2 text-xs font-medium text-palette-cream/80 uppercase tracking-wider border-b border-palette-cream/20">
        Admin
      </p>
      <nav class="flex-1 py-4 px-3">
        <NuxtLink
          v-for="item in navWithLogs"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-workflow text-sm font-medium transition-colors mb-0.5 border-l-4 border-transparent"
          :class="isActive(item.path) ? 'bg-palette-cream/15 border-palette-cream text-palette-white' : 'hover:bg-palette-cream/10'"
        >
          <span class="w-5 h-5 flex-shrink-0 flex items-center justify-center" aria-hidden="true">
            <!-- Dashboard / Home -->
            <svg v-if="item.icon === 'dashboard'" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <!-- Site Content / Document -->
            <svg v-else-if="item.icon === 'content'" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <!-- Menu / Grid -->
            <svg v-else-if="item.icon === 'menu'" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <!-- Venue / Location -->
            <svg v-else-if="item.icon === 'venue'" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <!-- Bookings / Calendar -->
            <svg v-else-if="item.icon === 'bookings'" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <!-- Logs -->
            <svg v-else-if="item.icon === 'logs'" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span v-else class="w-5 h-5 rounded bg-white/30" />
          </span>
          {{ item.label }}
        </NuxtLink>
      </nav>
      <div class="border-t border-palette-cream/20 p-3">
        <button
          type="button"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-workflow text-sm font-medium text-palette-cream/90 hover:bg-palette-cream/10 hover:text-palette-white transition-colors"
          @click="onLogout"
        >
          <span class="w-5 h-5 flex-shrink-0 flex items-center justify-center" aria-hidden="true">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </span>
          Logout
        </button>
      </div>
    </aside>
    <!-- Main content: offset by sidebar width; scrollbar-gutter keeps layout stable when pagination changes -->
    <main class="flex-1 min-w-0 ml-56 bg-palette-cream admin-main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import adminDashboardData from '~/data/admin-dashboard.json'

const adminData = adminDashboardData as {
  sidebar: { logoImage: string; logoAlt: string; brandText: string }
  nav: Array<{ label: string; path: string; icon: string }>
}

const route = useRoute()
const router = useRouter()
const { logout } = useAuth()

const navWithLogs = computed(() => [...adminData.nav, { label: 'Logs', path: '/admin/logs', icon: 'logs' }])

function isActive(path: string) {
  if (path === '/admin') return route.path === '/admin'
  return route.path.startsWith(path)
}

function onLogout() {
  logout()
  router.push('/login')
}
</script>

<style scoped>
.admin-main {
  scrollbar-gutter: stable;
}
</style>
