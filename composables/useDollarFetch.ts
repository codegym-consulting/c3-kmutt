/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NitroFetchRequest } from 'nitropack'
import type { Response } from '~/models/common'

type useApiOptions<T> =
  | ({ [others: string]: any } & {
      method?: string
      params?: Record<string, any>
      body?: any
      headers?: Record<string, any>
    })
  | undefined

export default async function useDollarFetch<T>(
  request: NitroFetchRequest,
  options?: useApiOptions<T>,
) {
  const config = useRuntimeConfig()
  const _request = request

  //@TODO add token to headers
  const headers: any = {
    ...(options?.headers ?? {}),
  }

  const opts: any = options ? (({ headers, ...opts }) => opts)(options) : null

  try {
    // Using $fetch instead of useFetch
    return new Promise<T & { statusCode: number }>(async (resolve) => {
      await $fetch<T>(_request, {
        baseURL: config.public.baseApiUrl,
        headers,
        credentials: 'include',
        ...opts,
        onResponse: ({ response }: any) => {
          const data = response._data as T
          const status = response.status as number
          resolve({ ...data, statusCode: status })
        },
      })
    })
  } catch (error: any) {
    // Handle error
    return error.data as Response
  }
}
