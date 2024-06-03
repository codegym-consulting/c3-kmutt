import { z } from 'zod'
import { selectSchema, nameSchema, optionalSelectSchema } from './common'

export const registerStepOneSchema = z.object({
  title: selectSchema,
  academicTitle: optionalSelectSchema,
  name: nameSchema,
  surname: nameSchema,
  nationality: selectSchema,
})
