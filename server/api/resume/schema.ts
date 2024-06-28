import { z } from 'zod'
import { type_of_degree, type_of_source } from '~/server/drizzle/schema'

const Experience = z.object({
    title: z.string().optional(),
    company: z.string().optional(),
    location: z.string().optional(), 
    startDate: z.string().optional(),
    endDate: z.string().optional()
})

const Education = z.object({
    typeOfDegree: z.enum(type_of_degree.enumValues),
    institution: z.string().optional(),
    fieldOfStudy: z.string().optional(),
    graduationYear: z.string().optional(),
})

const Skill = z.object({
    name: z.string(),
    level: z.number().int().min(1).max(5)
})

const Research = z.object({
    name: z.string(),
    categories: z.array(z.number().int()).optional(),
    date: z.string().optional(),
})

const Acacemic = Research

const Training = z.object({
    class: z.string(),
    date: z.string().optional(),
})

const Publication = z.object({
    typeOfSource: z.enum(type_of_source.enumValues),
    city: z.string().optional(),
    publisher: z.string().optional(),
    year: z.string().optional(),
    authors: z.array(z.string()).optional()
})

export const schema = z.object({
  photoUrl: z.string().url().or(z.literal('')).optional(),
  nickname: z.string(),
  contactEmail: z.string().email(),
  contactNumber: z.string(),
  educations: z.array(Education),
  experiences: z.array(Experience),
  skills: z.array(Skill),
  tools: z.array(Skill),
  research: z.array(Research),
  trainings: z.array(Training),
  academicServices: z.array(Acacemic),
  publications: z.array(Publication),
})

export type CreateResumeSchema = z.infer<typeof schema>
