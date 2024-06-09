import { z } from 'zod';
import { academicTitles, titles } from '~/data/common';

const schema = z.object({
  email: z.string().email(),
  title:  z.enum([titles[0].value, ...(titles.slice(1).map(title => title.value))] as [string, ...string[]]),
  name: z.string(),
  surname: z.string(),
  academicTitle:  z.union([z.enum([academicTitles[0].value, ...(academicTitles.slice(1).map(title => title.value))] as [string, ...string[]]), z.null()]),
  nationality: z.string(),
  occupation: z.string(),
  teachingExperience: z.array(z.any()),
  expertise: z.array(z.number()),
  organization: z.string(),
  subUnit: z.number(),
  areaOfInterest: z.array(z.number()),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    // Validate the body
    const validatedBody = schema.parse(body);
    return { body: validatedBody };
  } catch (error) {
    const zodError = JSON.parse(error as string)[0].message

    throw createError({
      statusCode: 400,
      statusMessage: zodError,
    })
  }
});