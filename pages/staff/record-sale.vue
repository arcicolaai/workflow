<template>
  <div class="min-h-full bg-palette-cream/40 font-poppins">
    <header class="bg-palette-white border-b border-palette-olive/15 shadow-sm">
      <div class="px-6 lg:px-8 py-6 sm:py-8">
        <h1 class="font-heading text-2xl sm:text-3xl font-bold text-palette-brown">Manual order</h1>
        <p class="mt-1 text-sm text-palette-brown/70">Pick items, choose hot or cold when available, then proceed to checkout.</p>
      </div>
    </header>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Step: Checkout (same process as scan/choose order) -->
      <div v-if="step === 'checkout'" class="max-w-lg mx-auto space-y-6">
        <div class="p-6 rounded-2xl bg-palette-white border-2 border-palette-sage shadow-md">
          <h2 class="text-lg font-semibold text-palette-brown mb-4">Checkout</h2>
          <p class="text-sm font-medium text-palette-brown/80 mb-2">Order No. {{ manualOrderId }}</p>
          <ul class="space-y-2 mb-4 text-sm text-palette-brown">
            <li v-for="(line, i) in orderLines" :key="lineKey(line)">
              {{ lineDisplayName(line) }} × {{ line.quantity }} — ₱{{ (line.price * line.quantity).toLocaleString() }}
            </li>
          </ul>
          <p class="font-semibold text-palette-dark text-lg">Total: ₱{{ orderTotal.toLocaleString() }}</p>
        </div>

        <div class="p-6 rounded-2xl bg-palette-white border border-palette-olive/20 shadow-sm">
          <label class="block text-sm font-semibold text-palette-brown mb-3">Payment</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="opt in paymentOptions"
              :key="opt"
              type="button"
              class="px-4 py-2.5 rounded-workflow border text-sm font-medium transition-colors"
              :class="selectedPayment === opt
                ? 'border-palette-sage bg-palette-sage/15 text-palette-sage'
                : 'border-palette-olive/40 bg-palette-white text-palette-brown hover:bg-palette-cream/60'"
              @click="selectedPayment = opt"
            >
              {{ opt }}
            </button>
          </div>
          <label class="block text-sm font-semibold text-palette-brown mt-4 mb-2">Amount paid (₱)</label>
          <input
            v-model.number="amountPaidInput"
            type="number"
            min="0"
            step="0.01"
            placeholder="0"
            class="w-full px-4 py-2.5 text-sm border border-palette-olive/40 rounded-workflow bg-palette-white text-palette-brown focus:ring-2 focus:ring-palette-sage/40 focus:border-palette-sage"
          />
          <p class="text-xs text-palette-brown/60 mt-1.5">Total due: ₱{{ orderTotal.toLocaleString() }}</p>
          <p v-if="amountPaidValid" class="text-sm font-medium text-palette-sage mt-2">Change: ₱{{ (Number(amountPaidInput) - orderTotal).toLocaleString() }}</p>
        </div>

        <div class="flex gap-2">
          <button
            type="button"
            class="flex-1 py-3 rounded-full bg-palette-sage text-palette-white font-semibold text-sm uppercase hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!selectedPayment || !amountPaidValid"
            @click="completeSale"
          >
            Complete sale
          </button>
          <button
            type="button"
            class="py-3 px-4 rounded-full border border-palette-olive/40 text-palette-brown font-medium text-sm"
            @click="step = 'cart'"
          >
            Back
          </button>
        </div>
      </div>

      <!-- Step: Cart (pick items + Proceed to checkout) -->
      <div v-else class="flex flex-col lg:flex-row gap-6">
        <!-- Menu: categories + items with hot/cold -->
        <div class="flex-1">
          <div v-for="cat in menuData" :key="cat.category" class="mb-6">
            <h2 class="text-lg font-semibold text-palette-brown mb-3">{{ cat.category }}</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div
                v-for="item in cat.items"
                :key="item.id"
                class="bg-palette-white rounded-xl border border-palette-olive/20 p-3 flex flex-col"
              >
                <p class="font-medium text-palette-brown text-sm truncate">{{ item.name }}</p>
                <p class="text-xs text-palette-brown/80">₱{{ item.price }}</p>
                <!-- With variants: Hot / Cold (Iced) -->
                <template v-if="item.variants && item.variants.length">
                  <div v-for="v in item.variants" :key="v" class="mt-2 flex items-center gap-2">
                    <span class="text-xs font-medium text-palette-brown/80 w-10 capitalize">{{ v === 'iced' ? 'Cold' : v }}</span>
                    <button
                      type="button"
                      class="w-7 h-7 rounded-lg bg-palette-grey/40 text-palette-brown hover:bg-palette-grey/60 font-bold text-sm flex-shrink-0"
                      :disabled="getQty(item.id, v) <= 0"
                      @click="adjustQty(item, -1, v)"
                    >
                      −
                    </button>
                    <span class="min-w-[1.25rem] text-center text-sm font-medium">{{ getQty(item.id, v) }}</span>
                    <button
                      type="button"
                      class="w-7 h-7 rounded-lg bg-palette-sage text-palette-white hover:opacity-90 font-bold text-sm flex-shrink-0"
                      @click="adjustQty(item, 1, v)"
                    >
                      +
                    </button>
                  </div>
                </template>
                <!-- No variants: single quantity -->
                <div v-else class="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    class="w-8 h-8 rounded-lg bg-palette-grey/40 text-palette-brown hover:bg-palette-grey/60 font-bold text-sm"
                    :disabled="getQty(item.id) <= 0"
                    @click="adjustQty(item, -1)"
                  >
                    −
                  </button>
                  <span class="min-w-[1.5rem] text-center text-sm font-medium">{{ getQty(item.id) }}</span>
                  <button
                    type="button"
                    class="w-8 h-8 rounded-lg bg-palette-sage text-palette-white hover:opacity-90 font-bold text-sm"
                    @click="adjustQty(item, 1)"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Current order + Proceed to checkout -->
        <div class="lg:w-80 shrink-0">
          <div class="bg-palette-white rounded-xl border border-palette-olive/20 shadow-md p-4 sticky top-4">
            <h2 class="font-semibold text-palette-brown mb-3">Current order</h2>
            <ul v-if="orderLines.length" class="space-y-2 mb-4 text-sm">
              <li v-for="line in orderLines" :key="lineKey(line)" class="flex justify-between gap-2">
                <span class="text-palette-brown truncate">{{ lineDisplayName(line) }} × {{ line.quantity }}</span>
                <span class="font-medium text-palette-dark">₱{{ (line.price * line.quantity).toLocaleString() }}</span>
              </li>
            </ul>
            <p v-else class="text-palette-brown/60 text-sm mb-4">No items added.</p>
            <p class="font-semibold text-palette-dark text-lg">Total: ₱{{ orderTotal.toLocaleString() }}</p>
            <button
              type="button"
              class="w-full mt-4 py-3 rounded-full bg-palette-sage text-palette-white font-semibold text-sm uppercase hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="orderLines.length === 0"
              @click="goToCheckout"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>

      <!-- Success: Order completed -->
      <Teleport to="body">
        <div v-if="step === 'done'" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50" @click.self="step = 'cart'">
          <div class="bg-palette-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center">
            <p class="text-palette-brown font-medium mb-4">Order completed.</p>
            <p class="text-sm text-palette-brown/80 mb-4">Order {{ lastCompletedOrderId }}</p>
            <button type="button" class="py-2 px-4 rounded-full bg-palette-sage text-palette-white font-semibold" @click="step = 'cart'; lastCompletedOrderId = ''">OK</button>
          </div>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'staff' })

const PAYMENT_OPTIONS = ['Cash', 'GCash'] as const

const { menuData } = useAdminMenu()
const { addSale } = useSales()
const { user } = useAuth()
const { getNextOrderNumber } = useOrderNumber()

interface OrderLine {
  id: number
  name: string
  price: number
  quantity: number
  variant?: string
}

const orderItems = ref<OrderLine[]>([])
const step = ref<'cart' | 'checkout' | 'done'>('cart')
const manualOrderId = ref('')
const lastCompletedOrderId = ref('')
const selectedPayment = ref('Cash')
const amountPaidInput = ref<number | ''>('')

const paymentOptions = PAYMENT_OPTIONS as unknown as string[]

const orderLines = computed(() => orderItems.value.filter((l) => l.quantity > 0))
const orderTotal = computed(() => orderLines.value.reduce((sum, l) => sum + l.price * l.quantity, 0))
const amountPaidValid = computed(() => {
  const paid = Number(amountPaidInput.value)
  if (Number.isNaN(paid) || paid < 0) return false
  return paid >= orderTotal.value
})

function lineKey(line: OrderLine) {
  return `${line.id}-${line.variant ?? ''}`
}

function lineDisplayName(line: OrderLine) {
  if (line.variant) {
    const label = line.variant === 'iced' ? 'Cold' : line.variant === 'hot' ? 'Hot' : line.variant
    return `${line.name} (${label})`
  }
  return line.name
}

function getQty(id: number, variant?: string) {
  const line = orderItems.value.find((l) => l.id === id && (l.variant ?? '') === (variant ?? ''))
  return line?.quantity ?? 0
}

function adjustQty(item: { id: number; name: string; price: number }, delta: number, variant?: string) {
  const existing = orderItems.value.find((l) => l.id === item.id && (l.variant ?? '') === (variant ?? ''))
  if (existing) {
    existing.quantity = Math.max(0, existing.quantity + delta)
  } else if (delta > 0) {
    orderItems.value.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      ...(variant && { variant }),
    })
  }
  orderItems.value = orderItems.value.filter((l) => l.quantity > 0)
}

function goToCheckout() {
  if (orderLines.value.length === 0) return
  manualOrderId.value = getNextOrderNumber()
  selectedPayment.value = paymentOptions[0]
  amountPaidInput.value = orderTotal.value
  step.value = 'checkout'
}

function completeSale() {
  if (orderLines.value.length === 0 || !user.value) return
  const paid = Number(amountPaidInput.value)
  addSale({
    orderId: manualOrderId.value,
    items: orderLines.value.map((l) => ({
      id: l.id,
      name: l.name,
      price: l.price,
      quantity: l.quantity,
      ...(l.variant && { variant: l.variant }),
    })),
    total: orderTotal.value,
    staffId: user.value.id,
    staffName: user.value.name,
    source: 'manual',
    paymentMethod: selectedPayment.value || undefined,
    amountPaid: Number.isNaN(paid) ? undefined : paid,
  })
  lastCompletedOrderId.value = manualOrderId.value
  orderItems.value = []
  step.value = 'done'
  useActivityLog().log('Sale recorded (manual)', `Order ${manualOrderId.value}, ₱${orderTotal.value.toLocaleString()}, ${selectedPayment.value}`)
}
</script>
