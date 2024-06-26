import type { $Fetch, NitroFetchRequest } from 'nitropack'
import type { Project } from './model'

export const landingRepository = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
  async getProjects(): Promise<Project[]> {
    return fetch('/landing/projects')
  },
})
