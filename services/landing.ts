import type { Project } from '~/models/landing'

export function getProjects() {
  return useApi<Project[]>('/landing/projects', { method: 'GET' })
}
