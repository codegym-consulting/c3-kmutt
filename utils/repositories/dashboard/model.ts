import { z } from 'zod'

export const personalInfomationSchema = z.object({
  occupation: selectSchema,
  organization: selectSchema,
  faculty: selectSchema,
  department: selectSchema,
  expertises: z.array(selectSchema),
  teachingExperience: z.string().optional(),
  areaOfInterests: z.array(selectSchema),
})

export type PersonalInformation = z.infer<typeof personalInfomationSchema>

export interface ProfileInformation extends PersonalInformation {
  avatarUrl: string
  name: string
  surname: string
  nickname: string
}

export interface ProfileInformationResponse
  extends Omit<
    ProfileInformation,
    'faculty' | 'department' | 'expertises' | 'areaOfInterests'
  > {
  faculty: number
  department: number
  expertises: number[]
  areaOfInterests: number[]
}

export const noteSchema = z.object({
  title: z.string().optional(),
  image: avatarSchema.optional(),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
})

export type Note = z.infer<typeof noteSchema>

export type PreviewNote = Omit<Note, 'image'> & {
  image?: string
  createdAt: string
}
