import type { FetchOptions } from 'ofetch'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const base = (): FetchOptions => ({
    baseURL: config.public.baseApiUrl,
    onRequest({ options }) {
      const headers = (options.headers ||= {})
      //@TODO add token to headers
      const token = ''
      const _headers = {
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
        ...headers,
      }
      if (Array.isArray(headers)) {
        Object.entries(_headers).forEach(([key, value]) => {
          headers.push([key, `${value}`])
        })
      } else if (headers instanceof Headers) {
        Object.entries(_headers).forEach(([key, value]) => {
          headers.set(key, `${value}`)
        })
      } else {
        Object.assign(headers, _headers)
      }
    },
  })

  const fetchApi = $fetch.create(base())

  return {
    provide: {
      fetchApi,
    },
  }
})
