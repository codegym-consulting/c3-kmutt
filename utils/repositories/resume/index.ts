import type { $Fetch, NitroFetchRequest } from 'nitropack'
import type {
  Option,
  FileUploadResponse,
  Response,
} from '~/utils/repositories/common/model'
import type { Resume } from '~/server/api/resume/index.post'

export const resumeRepository = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
  async uploadResume(
    files: File[],
    onSuccess?: (urls: string[]) => void,
    onError?: (error: string) => void,
  ): Promise<FileUploadResponse> {
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i])
    }
    return fetch('/upload/resume', {
      method: 'PUT',
      body: formData,
      onResponse: ({ response }) => {
        const data = response._data
        if ('message' in data) {
          onError?.(data.message)
        }

        if ('urls' in data) {
          onSuccess?.(data.urls)
        }
      },
    })
  },
  async uploadProfile(
    files: File,
    onSuccess?: (urls: string[]) => void,
    onError?: (error: string) => void,
  ): Promise<FileUploadResponse> {
    const formData = new FormData()
    formData.append('file', files)
    return fetch('/upload/resume/avatar', {
      method: 'PUT',
      body: formData,
      onResponse: ({ response }) => {
        const data = response._data
        if ('message' in data) {
          onError?.(data.message)
        }

        if ('urls' in data) {
          onSuccess?.(data.urls)
        }
      },
    })
  },
  async postCreateResume(
    body: Resume,
    onResponse?: (statusCode: number, res: Response) => void,
  ): Promise<Response> {
    return fetch('/resume', {
      method: 'POST',
      body,
      onResponse: ({ response }) => {
        const data = response._data
        const status = response.status as number
        onResponse?.(status, data)
      },
    })
  },
  async getCategories(query?: string): Promise<Option[]> {
    return fetch('/categories', { query: { query } })
  },
})
