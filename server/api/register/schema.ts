import { z } from "zod"
import { academicTitles, titles } from "~/data/common"

export const schema = z.object({
    email: z.string().email(),
    title: z.enum([titles[0].value, ...(titles.slice(1).map(title => title.value))] as [string, ...string[]]),
    name: z.string(),
    surname: z.string(),
    academicTitle: z.union([z.enum([academicTitles[0].value, ...(academicTitles.slice(1).map(title => title.value))] as [string, ...string[]]), z.null()]),
    nationality: z.string(),
    occupation: z.string(),
    teachingExperiences: z.array(z.any()),
    expertises: z.array(z.number().int()),
    organization: z.string(),
    faculty: z.number().int(),
    department: z.number().int(),
    areaOfInterests: z.array(z.number().int()),
  })
  
  export type Schema = z.infer<typeof schema>