<template>
  <div>
    <header>
      <div class="search-container">
        <div class="search-input-wrapper" v-if="!searchState">
          <input
            type="text"
            v-model.trim="searchQuery"
            placeholder="Search for photos"
            class="search-input" />

          <span class="search-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd" />
            </svg>
          </span>
        </div>

        <div v-if="searchState" class="search-status">
          <p v-if="!hasSearchResults">
            Searching for <span> "{{ searchQuery }}" </span>
          </p>
          <div v-else class="search-status-results">
            <p>
              Search Results for <span> "{{ searchQuery }}" </span>
            </p>
            <button class="clear-search" @click="clearSearch">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="wrapper">
      <ImageGrid v-if="!fetchError" :photos="photos" :loading="isLoading" />

      <div v-if="fetchError" class="error-message">
        {{ fetchError }}
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { UnsplashPhoto } from '~/types'
const { getRandomPhotos } = useUnsplashApi()

const photos = ref<UnsplashPhoto[]>([])
const searchQuery = ref('')
const isLoading = ref(false)
const isSearching = ref(false)
const hasSearchResults = ref(false)
const fetchError = ref<string | null>(null)

const searchState = computed(() => isSearching.value || hasSearchResults.value)

const fetchPhotos = async (query?: string) => {
  isLoading.value = true

  try {
    photos.value = await getRandomPhotos({ query })
  } catch (error) {
    fetchError.value = getErrorMessage(error, 'Failed to load photos.')
    // console.error('Error fetching photos:', error)
  } finally {
    isLoading.value = false
  }
}

watch(searchQuery, () => {
  if (searchQuery.value) {
    debouncedSearch()
  }
})

const debouncedSearch = useDebounceFn(() => {
  handleSearch()
}, 500)

const handleSearch = async () => {
  if (searchQuery.value) {
    isSearching.value = true
    await fetchPhotos(searchQuery.value)
    hasSearchResults.value = true
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  isSearching.value = false
  hasSearchResults.value = false
  fetchError.value = null
  fetchPhotos()
}

onMounted(() => {
  fetchPhotos()
})
</script>

<style lang="scss" scoped>
$header-height: 300px;

header {
  height: $header-height;
  background: #dde2e9;
  padding: 0 24px;
  display: flex;
  align-items: center;
}

.search-container {
  width: 100%;
  max-width: 80vw;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 100%;
  }

  .search-input-wrapper {
    position: relative;
    padding: 2rem 1rem;
  }

  .search-input {
    width: 100%;
    padding: 1.5rem 1.5rem 1.5rem 3rem;
    border: none;
    border-radius: 12px;
    background: white;
    font-size: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;

    &:focus {
      outline: none;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  }

  .search-icon {
    position: absolute;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    color: #666;
  }
}

.search-status {
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding-inline: 0.5rem;
  }

  p {
    font-size: 50px;
    color: #0a3e73;

    span {
      color: #6b7280;
      font-weight: normal;
    }

    @media (max-width: 768px) {
      font-size: 30px;
    }
  }

  &-results {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
  }
}

.clear-search {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  svg {
    width: 20px;
    height: 20px;
    color: #666;
  }
}

main.wrapper {
  min-height: calc(100vh - $header-height);
  padding: 0 24px;
  max-width: 75vw;
  margin-top: -50px;
  margin-bottom: 100px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    max-width: 100%;
  }
}

.error-message {
  text-align: center;
  padding: 2rem;
  color: #ef4444;
  font-size: 1.2rem;
  background: #fee2e2;
  border-radius: 8px;
  margin: 2rem 0;
}
</style>
