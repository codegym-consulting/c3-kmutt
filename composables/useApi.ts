/* eslint-disable @typescript-eslint/no-explicit-any */

import { type UseFetchOptions } from '#app'
import { type NitroFetchRequest } from 'nitropack'

export type useApiOptions<T> =
  | (UseFetchOptions<T, (res: T) => T> & { [others: string]: any })
  | undefined

export default async function useApi<T>(
  request: NitroFetchRequest,
  options?: useApiOptions<T>,
) {
  const config = useRuntimeConfig()
  const _request = request
  const compositeKey: string =
    Object.keys(options?.body ?? {}).length > 0
      ? JSON.stringify(options?.body ?? {})
      : Object.keys(options?.params ?? {}).length > 0
      ? JSON.stringify(options?.params ?? {})
      : Object.keys(options?.query ?? {}).length > 0
      ? JSON.stringify(options?.query ?? {})
      : ''

  //@TODO add token to headers
  const headers: any = {
    ...(options?.headers ?? {}),
  }

  const opts: any = options ? (({ headers, ...opts }) => opts)(options) : null
  const response = useFetch<T>(_request, {
    key: _request + compositeKey + options?.method,
    baseURL: config.public.baseApiUrl,
    headers,
    ...opts,
  })

  return response
}
