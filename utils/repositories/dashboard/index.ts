import type { $Fetch, NitroFetchRequest } from 'nitropack'
import type { ProfileInformation } from './model'

export const dashboardRepository = <T>(
  fetch: $Fetch<T, NitroFetchRequest>,
) => ({
  async getProfile(): Promise<ProfileInformation> {
    return fetch('/profile')
  },
  async getNotes(): Promise<NoteResponse[]> {
    return fetch('/notes')
  },
  async getRecentProjects(): Promise<Project[]> {
    return fetch('/profile/recent-projects')
  },
})
