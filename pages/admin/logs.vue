<template>
  <div class="min-h-full bg-palette-cream/40">
    <header class="bg-palette-white border-b border-palette-olive/15 shadow-sm">
      <div class="px-6 lg:px-8 py-6 sm:py-8">
        <h1 class="font-heading text-2xl sm:text-3xl font-bold text-palette-brown">Activity Logs</h1>
        <p class="mt-1 text-sm text-palette-brown/70 max-w-2xl">
          Recent actions by admin, staff, and manager. Logs are stored in this browser and shared across user types.
        </p>
      </div>
    </header>
    <div class="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div class="flex flex-wrap items-center gap-3 mb-4">
      <select
        v-model="filterRole"
        class="min-w-[140px] px-3 py-2.5 text-sm border border-palette-olive/40 rounded-workflow bg-palette-white text-palette-brown focus:ring-2 focus:ring-palette-sage/40 min-h-[42px]"
      >
        <option value="">All roles</option>
        <option value="admin">Admin</option>
        <option value="staff">Staff</option>
        <option value="manager">Manager</option>
      </select>
      <button
        type="button"
        class="inline-flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-red-600 hover:text-red-700 border border-red-200 rounded-workflow hover:bg-red-50 min-h-[42px]"
        @click="clearLogs"
      >
        Clear logs
      </button>
    </div>

    <div class="border border-palette-olive/30 rounded-workflow-lg overflow-hidden bg-palette-white shadow-md">
      <div class="overflow-x-auto">
        <table class="w-full divide-y divide-palette-olive/20">
          <thead class="bg-palette-olive/15">
            <tr>
              <th scope="col" class="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-palette-brown uppercase tracking-wider">Time</th>
              <th scope="col" class="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-palette-brown uppercase tracking-wider">Role</th>
              <th scope="col" class="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-palette-brown uppercase tracking-wider">User</th>
              <th scope="col" class="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-palette-brown uppercase tracking-wider">Action</th>
              <th scope="col" class="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-palette-brown uppercase tracking-wider">Details</th>
              <th scope="col" class="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-palette-brown uppercase tracking-wider hidden sm:table-cell">Path</th>
            </tr>
          </thead>
          <tbody class="bg-palette-white divide-y divide-palette-olive/15">
            <tr v-for="entry in paginatedLogs" :key="entry.id" class="hover:bg-palette-cream/50 transition-colors">
              <td class="px-3 sm:px-4 py-3 text-sm text-palette-brown whitespace-nowrap">{{ formatTime(entry.createdAt) }}</td>
              <td class="px-3 sm:px-4 py-3 whitespace-nowrap">
                <span
                  class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize"
                  :class="roleClass(entry.userRole)"
                >
                  {{ entry.userRole }}
                </span>
              </td>
              <td class="px-3 sm:px-4 py-3 text-sm">
                <p class="font-medium text-palette-dark">{{ entry.userName }}</p>
                <p class="text-palette-brown/80 text-xs truncate max-w-[180px]">{{ entry.userEmail }}</p>
              </td>
              <td class="px-3 sm:px-4 py-3 text-sm font-medium text-palette-dark">{{ entry.action }}</td>
              <td class="px-3 sm:px-4 py-3 text-sm text-palette-brown max-w-[200px] truncate" :title="entry.details">{{ entry.details ?? '—' }}</td>
              <td class="px-3 sm:px-4 py-3 text-xs text-palette-brown/70 hidden sm:table-cell">{{ entry.path ?? '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="px-4 sm:px-6 py-3 bg-palette-olive/10 border-t border-palette-olive/20 flex flex-wrap items-center justify-between gap-2 text-sm text-palette-brown">
        <span>Showing {{ pageStart }}-{{ pageEnd }} of {{ filteredLogs.length }}</span>
        <div class="flex items-center gap-1">
          <button type="button" class="p-2 rounded-workflow border border-palette-olive/40 bg-palette-white text-palette-brown hover:bg-palette-cream/80 disabled:opacity-50 disabled:pointer-events-none" aria-label="Previous page" :disabled="currentPage <= 1" @click="currentPage--">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <span class="px-2 text-palette-brown/80 text-sm">Page {{ currentPage }} of {{ totalPages || 1 }}</span>
          <button type="button" class="p-2 rounded-workflow border border-palette-olive/40 bg-palette-white text-palette-brown hover:bg-palette-cream/80 disabled:opacity-50 disabled:pointer-events-none" aria-label="Next page" :disabled="currentPage >= totalPages" @click="currentPage++">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>

    <p v-if="!entries.length" class="text-center py-12 text-palette-brown/80 text-sm">
      No activity logged yet. Log in, perform actions, and they will appear here.
    </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserRole } from '~/composables/useAuth'

definePageMeta({ layout: 'admin' })

const PAGE_SIZE = 10
const { entries, clearLogs: doClearLogs, refreshFromStorage } = useActivityLog()
const filterRole = ref('')

onMounted(() => { refreshFromStorage() })
const currentPage = ref(1)

const filteredLogs = computed(() => {
  const list = entries.value
  if (!filterRole.value) return list
  return list.filter((e) => e.userRole === filterRole.value)
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredLogs.value.length / PAGE_SIZE)))

const paginatedLogs = computed(() => {
  const list = filteredLogs.value
  const start = (currentPage.value - 1) * PAGE_SIZE
  return list.slice(start, start + PAGE_SIZE)
})

const pageStart = computed(() => {
  if (filteredLogs.value.length === 0) return 0
  return (currentPage.value - 1) * PAGE_SIZE + 1
})

const pageEnd = computed(() => Math.min(currentPage.value * PAGE_SIZE, filteredLogs.value.length))

watch(filterRole, () => { currentPage.value = 1 })

function formatTime(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

function roleClass(role: UserRole): string {
  switch (role) {
    case 'admin':
      return 'bg-palette-sage/90 text-palette-white'
    case 'staff':
      return 'bg-palette-olive/80 text-palette-cream'
    case 'manager':
      return 'bg-amber-100 text-amber-800'
    default:
      return 'bg-palette-grey text-palette-brown'
  }
}

function clearLogs() {
  if (confirm('Clear all activity logs? This cannot be undone.')) {
    doClearLogs()
  }
}
</script>
