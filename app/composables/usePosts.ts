import { getPosts } from '~~/services/post.service'

const cache = new Map<string, any[]>()

export const usePosts = (page: Ref<number>, search: Ref<string>) => {
  const limit = 10

  const posts = ref<any[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  let controller: AbortController | null = null

  const key = computed(() => `${page.value}-${search.value}`)

  const fetchPosts = async () => {
    // 🧠 1. cancel previous request
    controller?.abort()
    controller = new AbortController()

    // 🧠 2. cache check
    const cached = cache.get(key.value)
    if (cached) {
      posts.value = cached
      return
    }

    loading.value = true
    error.value = null

    try {
      const data = await getPosts(page.value, limit, search.value, {
        signal: controller.signal
      })

      cache.set(key.value, data)
      posts.value = data
    } catch (e: any) {
      // AbortError НЕ вважаємо помилкою UI
      if (e?.name === 'AbortError') return

      error.value = e
    } finally {
      loading.value = false
    }
  }

  watch(key, fetchPosts, { immediate: true })

  return { posts, loading, error }
}