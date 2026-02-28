<template>
  <div class="min-h-full bg-palette-cream/40">
    <header class="bg-palette-white border-b border-palette-olive/15 shadow-sm">
      <div class="px-6 lg:px-8 py-6 sm:py-8">
        <h1 class="font-heading text-2xl sm:text-3xl font-bold text-palette-brown">Orders</h1>
        <p class="mt-1 text-sm text-palette-brown/70">
          View all orders. Status updates in real time (read-only). Click a row to see order details.
        </p>
      </div>
    </header>
    <div class="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Filters (consistent with admin bookings/venue) -->
      <div class="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div class="flex flex-wrap items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <label for="filter-status-orders" class="text-sm font-medium text-palette-brown sr-only sm:not-sr-only">Status</label>
          <select
            id="filter-status-orders"
            v-model="filterStatus"
            class="min-w-[140px] sm:min-w-[160px] px-3 py-2.5 sm:px-4 text-sm border border-palette-olive/40 rounded-workflow bg-palette-white text-palette-brown focus:ring-2 focus:ring-palette-sage/40 focus:border-palette-sage min-h-[42px]"
          >
            <option value="">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <label for="filter-source-orders" class="text-sm font-medium text-palette-brown sr-only sm:not-sr-only">Source</label>
          <select
            id="filter-source-orders"
            v-model="filterSource"
            class="min-w-[120px] sm:min-w-[140px] px-3 py-2.5 sm:px-4 text-sm border border-palette-olive/40 rounded-workflow bg-palette-white text-palette-brown focus:ring-2 focus:ring-palette-sage/40 focus:border-palette-sage min-h-[42px]"
          >
            <option value="">All sources</option>
            <option value="qr">QR</option>
            <option value="manual">Manual</option>
          </select>
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 px-3 py-2.5 sm:px-4 text-sm font-medium text-red-600 hover:text-red-700 min-h-[42px]"
            @click="resetFilters"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Reset
          </button>
        </div>
      </div>

      <div class="border border-palette-olive/30 rounded-workflow-lg overflow-hidden bg-palette-white shadow-md">
        <div class="overflow-x-auto">
          <table class="min-w-[640px] w-full divide-y divide-palette-olive/20">
            <thead class="bg-palette-olive/15">
              <tr>
                <th scope="col" class="px-4 py-3 text-center text-xs font-semibold text-palette-brown uppercase">Order No.</th>
                <th scope="col" class="px-4 py-3 text-center text-xs font-semibold text-palette-brown uppercase">Items</th>
                <th scope="col" class="px-4 py-3 text-center text-xs font-semibold text-palette-brown uppercase">Total</th>
                <th scope="col" class="px-4 py-3 text-center text-xs font-semibold text-palette-brown uppercase">Payment</th>
                <th scope="col" class="px-4 py-3 text-center text-xs font-semibold text-palette-brown uppercase">Amount paid</th>
                <th scope="col" class="px-4 py-3 text-center text-xs font-semibold text-palette-brown uppercase">Change</th>
                <th scope="col" class="px-4 py-3 text-center text-xs font-semibold text-palette-brown uppercase">Date & time</th>
                <th scope="col" class="px-4 py-3 text-center text-xs font-semibold text-palette-brown uppercase">Source</th>
                <th scope="col" class="px-4 py-3 text-center text-xs font-semibold text-palette-brown uppercase">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-palette-olive/15">
              <template v-for="row in filteredOrders" :key="row.key">
                <tr
                  class="hover:bg-palette-cream/50 cursor-pointer transition-colors"
                  @click="toggleExpand(row.key)"
                >
                  <td class="px-4 py-3 text-sm font-medium text-palette-dark text-center">{{ row.orderId }}</td>
                  <td class="px-4 py-3 text-sm text-palette-brown text-center">{{ row.items }}</td>
                  <td class="px-4 py-3 text-sm font-semibold text-palette-dark text-center">₱{{ row.total.toLocaleString() }}</td>
                  <td class="px-4 py-3 text-sm text-palette-brown/80 text-center">{{ row.payment ?? '—' }}</td>
                  <td class="px-4 py-3 text-sm text-palette-brown/80 text-center">{{ row.amountPaid ?? '—' }}</td>
                  <td class="px-4 py-3 text-sm text-palette-brown/80 text-center">{{ row.changeDisplay ?? '—' }}</td>
                  <td class="px-4 py-3 text-sm text-center">
                    <template v-if="row.dateFormatted">
                      <p class="font-medium text-palette-dark">{{ row.dateFormatted.date }}</p>
                      <p v-if="row.dateFormatted.time" class="text-palette-brown/80 text-xs">{{ row.dateFormatted.time }}</p>
                    </template>
                    <span v-else class="text-palette-brown/80">—</span>
                  </td>
                  <td class="px-4 py-3 text-center">
                    <span
                      v-if="row.source"
                      class="inline-flex px-2 py-0.5 rounded text-xs font-medium"
                      :class="row.source === 'qr' ? 'bg-palette-sage/20 text-palette-sage' : 'bg-palette-olive/20 text-palette-brown'"
                    >
                      {{ row.source === 'qr' ? 'QR' : 'Manual' }}
                    </span>
                    <span v-else class="text-palette-brown/80">—</span>
                  </td>
                  <td class="px-4 py-3 text-center">
                    <span
                      class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium"
                      :class="row.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-palette-sage/20 text-palette-sage'"
                    >
                      {{ row.status }}
                    </span>
                  </td>
                </tr>
                <!-- Accordion: order details -->
                <tr v-if="expandedRowKey === row.key" class="bg-palette-olive/5">
                  <td colspan="9" class="px-4 py-4">
                    <div class="rounded-lg border border-palette-olive/20 bg-palette-white p-4">
                      <p class="text-xs font-semibold uppercase tracking-wider text-palette-brown/70 mb-3">Order details</p>
                      <ul class="space-y-2">
                        <li
                          v-for="(line, i) in row.lineItems"
                          :key="i"
                          class="flex justify-between gap-4 text-sm text-palette-brown"
                        >
                          <span>{{ line.name }} × {{ line.quantity }}</span>
                          <span class="font-medium text-palette-dark">₱{{ (line.price * line.quantity).toLocaleString() }}</span>
                        </li>
                      </ul>
                      <p class="mt-3 pt-3 border-t border-palette-olive/20 text-sm font-semibold text-palette-dark flex justify-between">
                        <span>Total</span>
                        <span>₱{{ row.total.toLocaleString() }}</span>
                      </p>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div v-if="!filteredOrders.length" class="px-4 py-8 text-center text-sm text-palette-brown/60">
          {{ allOrders.length ? 'No orders match the filters.' : 'No orders yet.' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'staff' })

const { pending, refreshFromStorage } = usePendingOrders()
const { records } = useSales()

onMounted(() => { refreshFromStorage() })

const expandedRowKey = ref<string | null>(null)
const filterStatus = ref('')
const filterSource = ref('')

function resetFilters() {
  filterStatus.value = ''
  filterSource.value = ''
}

function toggleExpand(key: string) {
  expandedRowKey.value = expandedRowKey.value === key ? null : key
}

/** Same style as venues/bookings: long date + time. */
function formatDateAndTime(iso: string): { date: string; time: string } {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return { date: '—', time: '' }
  const date = d.toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })
  const time = d.toLocaleTimeString('en-PH', { hour: 'numeric', minute: '2-digit', hour12: true })
  return { date, time }
}

interface LineItem { name: string; quantity: number; price: number }

type OrderRow = {
  key: string
  orderId: string
  items: string
  total: number
  payment?: string
  amountPaid?: string
  changeDisplay?: string
  dateFormatted?: { date: string; time: string }
  source?: 'qr' | 'manual'
  status: string
  lineItems: LineItem[]
}

const allOrders = computed(() => {
  const rows: OrderRow[] = []
  pending.value.forEach((o) => {
    rows.push({
      key: 'p-' + o.orderId,
      orderId: o.orderId,
      items: `${o.items.length} item(s)`,
      total: o.total,
      status: 'Pending',
      lineItems: o.items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })),
    })
  })
  records.value.forEach((r) => {
    const change = r.amountPaid != null ? r.amountPaid - r.total : null
    rows.push({
      key: 'c-' + r.id,
      orderId: r.orderId,
      items: `${r.items.length} item(s)`,
      total: r.total,
      payment: r.paymentMethod ?? undefined,
      amountPaid: r.amountPaid != null ? '₱' + r.amountPaid.toLocaleString() : undefined,
      changeDisplay: change != null ? '₱' + change.toLocaleString() : undefined,
      dateFormatted: formatDateAndTime(r.createdAt),
      source: r.source,
      status: 'Completed',
      lineItems: r.items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })),
    })
  })
  return rows
})

const filteredOrders = computed(() => {
  let list = allOrders.value
  if (filterStatus.value) {
    list = list.filter((row) => row.status === filterStatus.value)
  }
  if (filterSource.value) {
    list = list.filter((row) => row.source === filterSource.value)
  }
  return list
})
</script>
