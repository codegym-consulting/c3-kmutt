import { z } from 'zod'

export const personalInfomationSchema = z.object({
  occupation: selectSchema,
  organization: selectSchema,
  faculty: selectSchema,
  department: selectSchema,
  expertises: z.array(selectSchema),
  academicTitle: selectSchema.optional(),
  teachingExperiences: z.string().optional(),
  areaOfInterests: z.array(selectSchema),
})

export type PersonalInformation = z.infer<typeof personalInfomationSchema>

export interface ProfileInformation extends PersonalInformation {
  yourProjects: number
  yourNetwork: number
  avatarUrl: string  
  title: string
  name: string
  surname: string
  userId: number
  email: string
  nationality: string
  nickname: string | null
  phoneNo: string | null
  linkUrl: string | null
  address: string | null
  shortBio: string | null
}

export const noteSchema = z.object({
  title: z.string().optional(),
  image: avatarSchema.optional(),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
})

export type Note = z.infer<typeof noteSchema>

export type NoteResponse = {
  id: number
  title: string
  content: string | null
  imageUrl: string | null
  type: 'image' | 'text'
  createdAt: string
}

export type PreviewNote = Omit<Note, 'image'> & {
  id: number
  image?: string
  createdAt: string
}

export type NotificationData = {
  id: number
  userId: number
  thumbnailUrl: string
  title: string
  content: string
  externalUrl: string
  createdAt: string
}
