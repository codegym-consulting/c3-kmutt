import type { Option, Response } from '~/models/common'
import type { Schema } from '~/server/api/register/index.post'

export function getExpertises(query?: string) {
  return useApi<Option[]>('/expertises', { method: 'GET', query: { query } })
}

export function getInterests(query?: string) {
  return useApi<Option[]>('/interests', { method: 'GET', query: { query } })
}

export function postRegister(body: Schema) {
  return useDollarFetch<Response>('/register', { method: 'POST', body })
}

export function getFaculties() {
  return useApi<Option[]>('/faculties', { method: 'GET' })
}

export function getDepartments(facultyId?: number) {
  return useApi<Option[]>('/departments', {
    method: 'GET',
    query: facultyId ? { facultyId } : {},
  })
}
