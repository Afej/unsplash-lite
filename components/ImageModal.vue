<template>
  <div
    ref="modalRef"
    class="modal-overlay"
    :class="{ 'modal-show': show }"
    @click.self="emit('close')">
    <div class="modal-content" ref="imageContainerRef">
      <div class="image-container">
        <img
          :src="photos[currentIndex].urls.regular"
          :alt="photos[currentIndex].user.name" />
      </div>
      <div class="image-info">
        <h2>{{ photos[currentIndex].user.name }}</h2>
        <p>{{ photos[currentIndex].user.location }}</p>
      </div>
    </div>

    <button class="close-button" @click="emit('close')">&times;</button>
    <button
      class="nav-button prev"
      @click="previousImage"
      :disabled="currentIndex === 0">
      &#10094;
    </button>
    <button
      class="nav-button next"
      @click="nextImage"
      :disabled="currentIndex === photos.length - 1">
      &#10095;
    </button>
  </div>
</template>

<script setup lang="ts">
import type { UnsplashPhoto } from '~/types'

const props = defineProps<{
  show: boolean
  activePhoto: UnsplashPhoto
  photos: UnsplashPhoto[]
}>()

const emit = defineEmits<{
  close: []
}>()

const currentIndex = ref(
  props.photos.findIndex((p) => p.id === props.activePhoto.id)
)
const modalRef = ref<HTMLElement | null>(null)
const imageContainerRef = ref<HTMLElement | null>(null)

const { direction } = useSwipe(imageContainerRef, {
  onSwipeEnd(e) {
    if (direction.value === 'left') {
      nextImage()
    } else if (direction.value === 'right') {
      previousImage()
    }
  },
})

const nextImage = () => {
  if (currentIndex.value < props.photos.length - 1) {
    currentIndex.value++
  }
}

const previousImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    emit('close')
  } else if (e.key === 'ArrowRight') {
    nextImage()
  } else if (e.key === 'ArrowLeft') {
    previousImage()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'auto'
})
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;

  &.modal-show {
    opacity: 1;
    visibility: visible;
  }
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.image-container {
  img {
    max-height: 80vh;
    max-width: 100%;
  }
}

.image-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  padding: 2rem;
  color: #000;

  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 40px;
  cursor: pointer;
  z-index: 1001;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 24px;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }
}
</style>
