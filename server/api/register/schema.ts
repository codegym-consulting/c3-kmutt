import { z } from "zod"
import { createInsertSchema, } from 'drizzle-zod';
import { academic_title, occupation_type, profile, profile_title } from "~/server/drizzle/schema"

export const schema = createInsertSchema(profile, {
    email: z.string().email(),
    title: z.enum(profile_title.enumValues),
    name: z.string(),
    surname: z.string(),
    academicTitle: z.enum(academic_title.enumValues),
    nationality: z.string(),
    occupation: z.enum(occupation_type.enumValues),
    organization: z.string(),
    faculty: z.number().int(),
    department: z.number().int(),
    areaOfInterests: z.array(z.number().int()),
    expertises: z.array(z.number().int()),
    teachingExperiences: z.array(z.any()),
  })
  
  export type RegisterUserSchema = z.infer<typeof schema>

  export type ProfileTitle = z.infer<typeof schema.shape.title>
  export type AcademicTitle = z.infer<typeof schema.shape.academicTitle>
  export type Occupation = z.infer<typeof schema.shape.occupation>