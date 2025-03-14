<template>
  <div class="image-grid">
    <div v-if="loading" class="loading-grid">
      <div v-for="i in 12" :key="i" class="loading-item">
        <div class="loading-shimmer"></div>
      </div>
    </div>

    <template v-else>
      <div
        v-for="photo in photos"
        :key="photo.id"
        class="image-item"
        :style="{ gridRow: `span ${getSpan(photo.id)}` }"
        @click="openModal(photo)">
        <img
          :src="photo.urls.regular"
          :alt="photo.user.name"
          loading="lazy"
          @load="calculateSpan($event, photo.id)" />
        <div class="image-overlay">
          <div class="image-info">
            <h3>{{ photo.user.name }}</h3>
            <p>{{ photo.user.location }}</p>
          </div>
        </div>
      </div>
    </template>

    <Transition name="modal-fade">
      <ImageModal
        v-if="photos && selectedPhoto"
        :show="showModal"
        :active-photo="selectedPhoto"
        :photos="photos"
        @close="closeModal" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { UnsplashPhoto } from '~/types'

const props = defineProps<{
  photos: UnsplashPhoto[] | null
  loading: boolean
}>()

const selectedPhoto = ref<UnsplashPhoto | null>(null)
const imageSpans = ref(new Map())

const calculateSpan = (event: Event, photoId: string) => {
  const img = event.target as HTMLImageElement
  const aspectRatio = img.naturalHeight / img.naturalWidth
  const span = aspectRatio > 1.2 ? 2 : 1
  imageSpans.value.set(photoId, span)
}

const getSpan = (photoId: string) => {
  return imageSpans.value.get(photoId) || 1
}

const showModal = ref(false)

const openModal = (photo: UnsplashPhoto) => {
  selectedPhoto.value = photo
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  setTimeout(() => {
    selectedPhoto.value = null
  }, 300)
}
</script>

<style scoped lang="scss">
.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.image-item {
  position: relative;
  /* aspect-ratio: 3/4; */
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: #f0f0f0;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 20px;
  opacity: 1;
  transition: opacity 0.3s ease;
  color: white;
}

.image-info {
  h3 {
    margin: 0;
    font-size: 1.1em;
  }

  p {
    margin: 4px 0 0;
    font-size: 0.9em;
    opacity: 0.8;
  }
}

.loading-grid {
  display: contents;
}

.loading-item {
  aspect-ratio: 3/4;
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
}

.loading-shimmer {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.5s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
}
</style>
