import { z } from 'zod'
import {
  selectSchema,
  nameSchema,
  optionalSelectSchema,
  avatarSchema,
} from './common'

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
  degree: selectSchema,
  fieldOfStudy: z.string().optional(),
  school: z.string().optional(),
  graduation: z.string().optional(),
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

export const resumeFillInStepOneSchema = z.object({
  nickname: z.string().optional(),
  avatar: avatarSchema.optional(),
  email: z
    .string()
    .optional()
    .refine((val) => val === '' || z.string().email().safeParse(val).success, {
      message: 'Invalid email address',
    }),
  phone: z.string().optional(),
  education: z.array(educationSchema).optional(),
  experience: z.array(experienceSchema).optional(),
})

export type ResumeFillInStepOne = z.infer<typeof resumeFillInStepOneSchema>
