import type { Option, FileUploadResponse, Response } from '~/models/common'
import type { Resume } from '~/server/api/resume/index.post'

export function uploadResume(files: File[]) {
  const formData = new FormData()
  for (let i = 0; i < files.length; i++) {
    formData.append('file', files[i])
  }
  return useDollarFetch<FileUploadResponse>('/upload/resume', {
    method: 'PUT',
    body: formData,
  })
}

export function uploadProfile(files: File) {
  const formData = new FormData()
  formData.append('file', files)
  return useDollarFetch<FileUploadResponse>('/upload/resume/avatar', {
    method: 'PUT',
    body: formData,
  })
}

export function postCreateResume(body: Resume) {
  return useDollarFetch<Response>('/resume', { method: 'POST', body })
}

export function getCategories(query?: string) {
  return useApi<Option[]>('/categories', { method: 'GET', query: { query } })
}
