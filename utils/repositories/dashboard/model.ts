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
  firstName: string
  lastName: string
  surName: string
}
