import type { $Fetch, NitroFetchRequest } from 'nitropack'
import type { Note, NotificationData, ProfileInformation } from './model'
import type { CreateNoteSchema } from '~/server/api/notes/schema'

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
  async getNotifications(): Promise<NotificationData[]> {
    return fetch('/notification/activities')
  },
  async removeNote(
    id: string | number,
    onResponse?: (statusCode: number) => void,
  ): Promise<void> {
    return fetch(`/notes/${id}`, {
      method: 'DELETE',
      onResponse: ({ response }) => {
        const status = response.status as number
        onResponse?.(status)
      },
    })
  },
  async createOrUpdateNote(
    note: Note & { id?: string | number },
    onResponse?: (statusCode: number, res: Response) => void,
  ): Promise<void> {
    const path = note.id ? `/notes/${note.id}` : '/notes'
    const method = note.id ? 'PATCH' : 'POST'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onCreateReponse = ({ response }: any) => {
      const data = response._data
      const status = response.status as number
      onResponse?.(status, data)
    }

    const body: CreateNoteSchema = {
      title: note.title || 'Untitled',
      content: note.description,
      type: 'text',
    }
    if (note.image) {
      body.type = 'image'

      const formData = new FormData()
      formData.append('file', note.image)

      await fetch('/upload/image/note', {
        method: 'PUT',
        body: formData,
        onResponse: ({ response }) => {
          const data = response._data

          if ('urls' in data) {
            body.imageUrl = data.urls[0]
            return fetch(path, {
              method,
              body,
              onResponse: onCreateReponse,
            })
          } else {
            const status = response.status as number
            onResponse?.(status, data)
          }
        },
      })
    } else {
      return fetch(path, {
        method,
        body,
        onResponse: onCreateReponse,
      })
    }
  },
})
