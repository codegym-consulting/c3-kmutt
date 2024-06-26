import { z } from 'zod'
import {
  selectSchema,
  nameSchema,
  optionalSelectSchema,
} from '~/utils/repositories/common/model'

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
  faculty: selectSchema,
  department: selectSchema,
  areaOfInterest: z.array(selectSchema).min(1, 'Required'),
})

export const educationSchema = z.object({
  degree: selectSchema.optional(),
  fieldOfStudy: z.string().optional(),
  school: z.string().optional(),
  graduation: z.union([z.string(), z.number()]).optional(),
})

export type Education = z.infer<typeof educationSchema>

export const experienceSchema = z.object({
  job: z.string().optional(),
  company: z.string().optional(),
  location: z.string().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
})

export type Experience = z.infer<typeof experienceSchema>