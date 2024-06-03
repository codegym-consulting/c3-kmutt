import { z } from 'zod'
import { selectSchema, nameSchema } from './common'

export const registerStepOneSchema = z.object({
  title: selectSchema,
  academicTitle: selectSchema,
  name: nameSchema,
  surname: nameSchema,
  nationality: selectSchema,
})
