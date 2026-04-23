import {api} from './api.client'
export type Post = {
  id: number
  title: string
  body: string
}

// export const getPosts = (page: number, limit: number) => {
//   return api<Post[]>(`/posts?_page=${page}&_limit=${limit}`)
// }

export const getPost = (id: string | number) => {
  return api<Post>(`/posts/${id}`)
}


export const getPosts = async (
  page: number,
  limit: number,
  search: string,
  options?: { signal?: AbortSignal }
): Promise<Post[]> => {
  const params = new URLSearchParams()

  params.append('_page', String(page))
  params.append('_limit', String(limit))

  if (search) {
    params.append('q', search)
  }

  return api<Post[]>(`/posts?${params.toString()}`, options)
}