import { z } from 'zod';
import { typeOfDegrees, typeOfSources } from '~/data/common';

const Experience = z.object({
    title: z.string().optional(),
    company: z.string().optional(),
    location: z.string().optional(), 
    startDate: z.string().optional(),
    endDate: z.string().optional()
})

const Education = z.object({
    typeOfDegree: z.enum([typeOfDegrees[0].value, ...(typeOfDegrees.slice(1).map(item => item.value))] as [string, ...string[]]),
    institution: z.string().optional(),
    fieldOfStudy: z.string().optional(),
    graduationYear: z.string().optional(),
})

const Skill = z.object({
    name: z.string(),
    level: z.number().int().min(1).max(5)
})

const Project = z.object({
    name: z.string(),
    categories: z.array(z.number().int()).optional(),
    date: z.string().optional(),
})

const Acacemic = Project

const Training = z.object({
    class: z.string(),
    date: z.string().optional(),
})

const Publication = z.object({
    typeOfSource: z.enum([typeOfSources[0].value, ...(typeOfSources.slice(1).map(item => item.value))] as [string, ...string[]]),
    city: z.string().optional(),
    publisher: z.string().optional(),
    year: z.string().optional(),
    authors: z.array(z.string()).optional()
})

const schema = z.object({
  photoUrl: z.string().url().or(z.literal('')).optional(), // TODO: are you sure?
  nickname: z.string(),
  contactEmail: z.string().email(),
  contactNumber: z.string(),
  educations: z.array(Education),
  experiences: z.array(Experience),
  skills: z.array(Skill),
  tools: z.array(Skill),
  projects: z.array(Project),
  trainings: z.array(Training),
  academicServices: z.array(Acacemic),
  publications: z.array(Publication),
});

export type Resume = z.infer<typeof schema>

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event)
    const result = await readValidatedBody(event, body => schema.safeParse(body))

    if (!result.success) {
        const errorDetails = result.error.flatten();
        const errorMessage = result.error.errors
        .map(({ path, message }) => `${path[path.length - 1]} in ${path[0]} is ${message}`)
        .join('\n');
        
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
            message: errorMessage,
            data: errorDetails
        })
    }

    console.log(result.data)
  
    setResponseStatus(event, 201)
    return { statusMessage: `Resume of ${session.user.email} created successfully` };
});