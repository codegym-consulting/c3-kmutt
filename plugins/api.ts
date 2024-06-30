import type { FetchOptions } from 'ofetch'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const accessToken = useCookie('accessToken').value
  const session = useCookie('nuxt-session').value
  const Cookie = [
    accessToken ? `accessToken=${accessToken}` : '',
    session ? `nuxt-session=${session}` : '',
  ]
    .filter(Boolean)
    .join(';')
  const base = (): FetchOptions => ({
    baseURL: config.public.baseApiUrl,
    onRequest({ options }) {
      const headers = (options.headers ||= {})
      const _headers = {
        ...headers,
        ...(Cookie
          ? {
              Cookie,
            }
          : {}),
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
