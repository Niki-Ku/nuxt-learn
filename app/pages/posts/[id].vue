<template>
  <div style="padding: 20px">
    <NuxtLink to="/">← Back</NuxtLink>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error loading post</div>


    <div v-else-if="post">
      <h1>{{ post.title }}</h1>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

type Post = {
  id: number
  title: string
  body: string
}
const { post, loading, error } = usePost(route.params.id as string)

// const { data: post, pending: loading } = useAsyncData<Post>(
//   `post-${route.params.id}`,
//   () => $fetch(`https://jsonplaceholder.typicode.com/posts/${route.params.id}`)
// )
</script>