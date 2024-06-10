import { z } from 'zod';

const Experience = z.object({
    title: z.string().optional(),
    company: z.string().optional(),
    location: z.string().optional(), 
    startDate: z.string().optional(),
    endDate: z.string().optional()
})

const Education = z.object({
    typeOfDegree: z.string().optional(),
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
    category: z.number().int().optional(),
    date: z.string().optional(),
})

const Acacemic = Project

const Training = z.object({
    class: z.string(),
    date: z.string().optional(),
})

const Author = z.object({
    name: z.string().optional(),
    publisher: z.string().optional(),
    year: z.string().optional(),
})

const Publication = z.object({
    typeOfSource: z.string(),
    city: z.string().optional(),
    authors: z.array(Author)
})

const schema = z.object({
  photoUrl: z.string().url().optional(),
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

export default defineEventHandler(async (event) => {
    const result = await readValidatedBody(event, body => schema.safeParse(body))

    if (!result.success) {
      throw createError({
        statusCode: 400,
        statusMessage: result.error.issues[0].message
      })
    }

    console.log(result.data)
  
    setResponseStatus(event, 201)
    return { statusMessage: 'Resume created successfully' };
});