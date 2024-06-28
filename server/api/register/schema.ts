import { z } from "zod"
import { createInsertSchema, } from 'drizzle-zod';
import { academic_title, profile, profile_title } from "~/server/drizzle/schema"

export const schema = createInsertSchema(profile, {
    email: z.string().email(),
    title: z.enum(profile_title.enumValues),
    name: z.string(),
    surname: z.string(),
    academicTitle: z.enum(academic_title.enumValues),
    nationality: z.string(),
    occupation: z.string(),
    organization: z.string(),
    faculty: z.number().int(),
    department: z.number().int(),
    areaOfInterests: z.array(z.number().int()),
    expertises: z.array(z.number().int()),
    teachingExperiences: z.array(z.any()),
  })
  
  export type CreateProfileSchema = z.infer<typeof schema>