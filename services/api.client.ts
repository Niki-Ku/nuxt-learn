const BASE_URL = 'https://jsonplaceholder.typicode.com'

type ApiOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: any
  signal?: AbortSignal
}

export const api = async <T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> => {
  const {
    method = 'GET',
    headers = {},
    body,
    signal
  } = options

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined,
      signal
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => null)

      throw {
        message: errorData?.message || 'API Error',
        status: res.status,
        data: errorData,
        name: 'ApiError'
      }
    }

    return await res.json()
  } catch (error: any) {
    if (error?.name === 'AbortError') {
      throw error
    }

    console.error('[API ERROR]', error)
    throw error
  }
}