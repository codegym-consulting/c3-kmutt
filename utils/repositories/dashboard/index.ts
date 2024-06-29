import type { $Fetch, NitroFetchRequest } from 'nitropack'
import type { ProfileInformationResponse } from './model'

export const dashboardRepository = <T>(
  fetch: $Fetch<T, NitroFetchRequest>,
) => ({
  async getProfile(): Promise<ProfileInformationResponse> {
    return fetch('/profile')
  },
})
