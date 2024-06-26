import type { $Fetch, NitroFetchRequest } from 'nitropack'
import type { Option, Response } from '~/utils/repositories/common/model'
import type { Schema } from '~/server/api/register/index.post'

export const registerRepository = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
  async getExpertises(query?: string): Promise<Option[]> {
    return fetch('/expertises', { query: { query } })
  },
  async getInterests(query?: string): Promise<Option[]> {
    return fetch('/interests', { query: { query } })
  },
  async postRegister(
    body: Schema,
    onResponse?: (statusCode: number, res: Response) => void,
  ): Promise<Response> {
    return fetch('/register', {
      method: 'POST',
      body,
      onResponse: ({ response }) => {
        const data = response._data
        const status = response.status as number
        onResponse?.(status, data)
      },
    })
  },
  async getFaculties(): Promise<Option[]> {
    return fetch('/faculties')
  },
  async getDepartments(facultyId?: number): Promise<Option[]> {
    return fetch('/departments', { query: facultyId ? { facultyId } : {} })
  },
})
