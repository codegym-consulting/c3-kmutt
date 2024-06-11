/* eslint-disable @typescript-eslint/no-explicit-any */

import { type UseFetchOptions } from '#app'
import { type NitroFetchRequest } from 'nitropack'

export type useApiOptions<T> =
  | (UseFetchOptions<T, (res: T) => T> & { [others: string]: any })
  | undefined

function generateCacheKey(
  request: NitroFetchRequest,
  options?: useApiOptions<any>,
): string {
  const compositeKey: string =
    Object.keys(options?.body ?? {}).length > 0
      ? JSON.stringify(options?.body ?? {})
      : Object.keys(options?.params ?? {}).length > 0
      ? JSON.stringify(options?.params ?? {})
      : Object.keys(options?.query ?? {}).length > 0
      ? JSON.stringify(options?.query ?? {})
      : ''
  return `${request}-${compositeKey}-${options?.method}`
}

export default async function useApi<T>(
  request: NitroFetchRequest,
  options?: useApiOptions<T>,
) {
  const nuxtApp = useNuxtApp()
  const config = useRuntimeConfig()
  const _request = request
  const cacheKey = generateCacheKey(_request, options)

  //@TODO add token to headers
  const headers: any = {
    ...(options?.headers ?? {}),
  }

  const isGet = options?.method === 'GET' || options?.method === 'get'
  const isNoCache = options?.cache === 'no-cache'
  const cacheLayer =
    !isGet || isNoCache
      ? {}
      : {
          getCachedData: (key: string) => {
            return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
          },
        }

  const opts: any = options ? (({ headers, ...opts }) => opts)(options) : null
  const response = await useFetch<T>(_request, {
    key: cacheKey,
    baseURL: config.public.baseApiUrl,
    headers,
    ...cacheLayer,
    ...opts,
  })

  return response
}
