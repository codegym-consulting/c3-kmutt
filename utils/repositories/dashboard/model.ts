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
  name: string
  surname: string
  nickname: string
  phoneNo: string
  title: string
  userId: number
  email: string
  linkUrl: string
  address: string
  shortBio: string
  nationality: string
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
  content: string
  imageUrl: string
  type: 'image' | 'text'
  createdAt: string
}

export type PreviewNote = Omit<Note, 'image'> & {
  image?: string
  createdAt: string
}

export type NotificationData = {
  imageUrl: string
  title: string
  description: string
  createdAt: string
}
