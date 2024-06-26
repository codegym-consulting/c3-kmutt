import { z } from 'zod'
import { selectSchema, avatarSchema } from '~/utils/repositories/common/model'

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

export const skillLevelSchema = z
  .object({
    value: z.number(),
    label: z.string(),
  })
  .strict()

export type SkillLevel = z.infer<typeof skillLevelSchema>

export const resumeFillInStepTwoSchema = z.object({
  skills: z.array(skillLevelSchema).min(0),
  tools: z.array(skillLevelSchema).min(0),
})

export type ResumeFillInStepTwo = z.infer<typeof resumeFillInStepTwoSchema>

export const researchSchema = z.object({
  topic: z.string().optional(),
  category: z.array(selectSchema).min(0),
  date: z.string().optional(),
})

export type Research = z.infer<typeof researchSchema>

export const trainingSchema = z.object({
  course: z.string().optional(),
  date: z.string().optional(),
})

export type Training = z.infer<typeof trainingSchema>

export const publicationSchema = z.object({
  type: selectSchema.optional(),
  city: z.string().optional(),
  author: z.array(z.string()).min(0),
  publisher: z.string().optional(),
  year: z.string().optional(),
})

export type Publication = z.infer<typeof publicationSchema>

export const resumeFillInStepThreeSchema = z.object({
  research: z.array(researchSchema).min(0),
  training: z.array(trainingSchema).min(0),
  academicService: z.array(researchSchema).min(0),
  publication: z.array(publicationSchema).min(0),
})

export type ResumeFillInStepThree = z.infer<typeof resumeFillInStepThreeSchema>
