import type { Option } from '~/models/common'

export function getExpertises() {
  return useApi<Option[]>('/expertises', { method: 'GET' })
}

export function getInterests() {
  return useApi<Option[]>('/interests', { method: 'GET' })
}
