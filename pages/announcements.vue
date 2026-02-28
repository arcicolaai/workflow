<template>
  <div class="min-h-[60vh] bg-white font-poppins py-12 md:py-16">
    <div class="max-w-[1440px] mx-auto px-6 lg:px-12">
      <h1 class="text-3xl md:text-4xl font-bold font-poppins text-workflow-green mb-8 text-center">{{ siteData.announcements.title }}</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <button
          v-for="item in siteData.announcements.items"
          :key="item.id"
          type="button"
          class="bg-white rounded-xl shadow-lg overflow-hidden text-left hover:shadow-xl transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-workflow-green cursor-pointer"
          @click="openAnnouncementModal(item)"
        >
          <img :src="item.image" :alt="item.title" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h2 class="font-bold font-poppins text-palette-brown">{{ item.title }}</h2>
          </div>
        </button>
      </div>
    </div>
    <AnnouncementDetailModal v-model="showAnnouncementModal" :announcement="selectedAnnouncement" />
  </div>
</template>

<script setup lang="ts">
const { siteData } = useSiteData()
const route = useRoute()

const showAnnouncementModal = ref(false)
const selectedAnnouncement = ref<{ id: string; title: string; image: string; description?: string } | null>(null)

function openAnnouncementModal(item: { id: string; title: string; image: string; description?: string }) {
  selectedAnnouncement.value = item
  showAnnouncementModal.value = true
}

// Open modal when navigating with ?id=xxx (e.g. from a shared link)
watch(() => route.query.id, (id) => {
  if (!id) return
  const item = siteData.announcements.items.find((a) => a.id === id)
  if (item) {
    selectedAnnouncement.value = item
    showAnnouncementModal.value = true
  }
}, { immediate: true })
</script>
