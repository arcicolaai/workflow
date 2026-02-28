<template>
  <Teleport to="body">
    <Transition name="modal-backdrop">
      <div
        v-if="modelValue && announcement"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 font-poppins"
        @click.self="$emit('update:modelValue', false)"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col animate-fade-in-up"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          @click.stop
        >
        <div class="relative flex-1 overflow-y-auto">
          <img :src="announcement.image" :alt="announcement.title" class="w-full h-48 sm:h-56 object-cover" />
          <div class="p-5 sm:p-6">
            <h2 :id="titleId" class="text-xl sm:text-2xl font-bold text-palette-brown mb-3">
              {{ announcement.title }}
            </h2>
            <p v-if="announcement.description" class="text-palette-brown/90 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {{ announcement.description }}
            </p>
          </div>
        </div>
        <div class="p-4 border-t border-palette-olive/20 flex justify-end">
          <button
            type="button"
            class="px-5 py-2.5 rounded-full font-semibold text-sm uppercase tracking-wide transition-opacity hover:opacity-90"
            style="background-color: #7B7557; color: white;"
            @click="$emit('update:modelValue', false)"
          >
            Close
          </button>
        </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
  announcement: { id: string; title: string; image: string; description?: string } | null
}>()
defineEmits<{ 'update:modelValue': [value: boolean] }>()

const titleId = 'announcement-modal-title'
</script>
