import type { Option, Response } from '~/models/common'
import type { Schema } from '~/server/api/register.post'

export function getExpertises(query?: string) {
  return useApi<Option[]>('/expertises', { method: 'GET', query: { query } })
}

export function getInterests(query?: string) {
  return useApi<Option[]>('/interests', { method: 'GET', query: { query } })
}

export function getSubUnits(query?: string) {
  return useApi<Option[]>('/sub-unit', { method: 'GET', query: { query } })
}

export function postRegister(body: Schema) {
  return useApi<Response>('/register', { method: 'POST', body })
}
