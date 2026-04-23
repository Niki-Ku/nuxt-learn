import { getPost } from '~~/services/post.service'

export const usePost = (id: string) => {
  const { data, pending, error } = useAsyncData(
    `post-${id}`,
    () => getPost(id)
  )

  return {
    post: data,
    loading: pending,
    error
  }
}