import { z } from 'zod'
import { selectSchema, nameSchema, optionalSelectSchema } from './common'

export const registerStepOneSchema = z.object({
  title: selectSchema,
  academicTitle: optionalSelectSchema,
  name: nameSchema,
  surname: nameSchema,
  nationality: selectSchema,
})

export const registerStepTwoSchema = z.object({
  occupation: selectSchema,
  teachingExperience: z.string().optional(),
  expertise: z.array(selectSchema).min(1, 'Required'),
  organization: selectSchema,
  subUnit: selectSchema,
  areaOfInterest: z.array(selectSchema).min(1, 'Required'),
})
