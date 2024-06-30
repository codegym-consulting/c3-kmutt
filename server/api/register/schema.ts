import { z } from "zod"
import { createInsertSchema, } from 'drizzle-zod';
import { academic_title, occupation_type, profile, profile_title } from "~/server/drizzle/schema"

export const createProfileSchema = createInsertSchema(profile, {
    email: z.string().email(),
    title: z.enum(profile_title.enumValues),
    name: z.string().trim().min(1),
    surname: z.string().trim().min(1),
    academicTitle: z.enum(academic_title.enumValues),
    nationality: z.string().trim().min(1),
    occupation: z.enum(occupation_type.enumValues),
    organization: z.string().trim().min(1),
    faculty: z.number().int(),
    department: z.number().int(),
    areaOfInterests: z.array(z.number().int()),
    expertises: z.array(z.number().int()),
    teachingExperiences: z.array(z.any()),
})

export const updateProfileSchema = createInsertSchema(profile, {
  email: z.string().email().optional(),
  title: z.enum(profile_title.enumValues).optional(),
  name: z.string().trim().min(1).optional(),
  surname: z.string().trim().min(1).optional(),
  nickname: z.string().trim().min(1).optional(),
  shortBio: z.string().trim().min(1).optional(),
  phoneNo: z.string().trim().min(1).optional(),
  linkUrl: z.string().url().optional(),
  address: z.string().trim().min(1).optional(),
  academicTitle: z.enum(academic_title.enumValues).optional(),
  nationality: z.string().trim().min(1).optional(),
  occupation: z.enum(occupation_type.enumValues).optional(),
  organization: z.string().trim().min(1).optional(),
  faculty: z.number().int().optional(),
  department: z.number().int().optional(),
  areaOfInterests: z.array(z.number().int()).optional(),
  expertises: z.array(z.number().int()).optional(),
  teachingExperiences: z.array(z.any()).optional(),
})
  
export type RegisterUserSchema = z.infer<typeof createProfileSchema>
export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>

export type ProfileTitle = z.infer<typeof createProfileSchema.shape.title>
export type AcademicTitle = z.infer<typeof createProfileSchema.shape.academicTitle>
export type Occupation = z.infer<typeof createProfileSchema.shape.occupation>