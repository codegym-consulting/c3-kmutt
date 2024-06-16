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

export enum PUBLICATION_TYPE {
  BOOK = 'Book',
  BOOK_SECTION = 'Book section',
  JOURNAL_ARTICLE = 'Journal article',
  ARTICLE_IN_A_PERIODICAL = 'Article in a Periodical',
  CONFERENCE_PROCEEDINGS = 'Conference proceedings',
  REPORT = 'Report',
  WEBSITE = 'Website',
  ELECTRONIC_SOURCE = 'Electronic source',
  ART = 'Art',
  SOUND_RECORDING = 'Sound recording',
  PERFORMANCE = 'Performance',
  FILM = 'Film',
  INTERVIEW = 'Interview',
  PATENT = 'Patent',
}

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
