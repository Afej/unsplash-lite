import axios from 'axios'
import type { UnsplashPhoto } from '~/types'

interface GetRandomPhotosParams {
  count?: number
  query?: string
}

export const useUnsplashApi = () => {
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Client-ID ${config.public.unsplashAccessKey}`,
    },
  })

  const getRandomPhotos = async ({
    count = 15,
    query,
  }: GetRandomPhotosParams = {}): Promise<UnsplashPhoto[]> => {
    const { data } = await api.get('/photos/random', {
      params: {
        count,
        query: query || undefined,
      },
    })

    return data.map((photo: UnsplashPhoto) => ({
      id: photo.id,
      urls: {
        raw: photo.urls.raw,
        full: photo.urls.full,
        regular: photo.urls.regular,
        small: photo.urls.small,
        thumb: photo.urls.thumb,
      },
      user: {
        name: photo.user.name,
        location: photo.user.location || '',
      },
    }))
  }

  return {
    getRandomPhotos,
  }
}
