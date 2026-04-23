<template>
  <div style="padding: 20px">
    <h1>Posts</h1>

    <!-- 🔍 search -->
    <input v-model="search" placeholder="Search posts..." />

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error loading posts</div>

    <div v-else>
      <NuxtLink
        v-for="post in posts"
        :key="post.id"
        :to="`/posts/${post.id}`"
      >
        {{ post.title }}
      </NuxtLink>
    </div>

    <!-- pagination -->
    <div style="margin-top: 20px">
      <button @click="prevPage" :disabled="page === 1">
        Prev
      </button>

      <span style="margin: 0 10px">
        Page {{ page }}
      </span>

      <button @click="nextPage">
        Next
      </button>
    </div>
  </div>
</template>н

<script setup lang="ts">
const page = ref(1)

// 👇 сирий input
const search = ref('')

// 👇 debounce значення
const debouncedSearch = ref('')

// 👇 debounce логіка
let timeout: ReturnType<typeof setTimeout>

watch(search, (value) => {
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    debouncedSearch.value = value
    page.value = 1
  }, 400)
})


// 👇 підключаємо дані
const { posts, loading, error } = usePosts(page, debouncedSearch)

// 👇 UX: при новому пошуку — назад на 1 сторінку
watch(debouncedSearch, () => {
  page.value = 1
})

// pagination
const nextPage = () => page.value++
const prevPage = () => {
  if (page.value > 1) page.value--
}
</script>