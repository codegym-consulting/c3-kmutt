/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod'

type ArrayLengthMutationKeys =
  | 'splice'
  | 'push'
  | 'pop'
  | 'shift'
  | 'unshift'
  | number
type ArrayItems<T extends Array<any>> = T extends Array<infer TItems>
  ? TItems
  : never
export type FixedLengthArray<T extends any[]> = Pick<
  T,
  Exclude<keyof T, ArrayLengthMutationKeys>
> & { [Symbol.iterator]: () => IterableIterator<ArrayItems<T>> }

export const selectSchema = z
  .object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
    disabled: z.boolean().optional(),
  })
  .strict()

export type Option = {
  value: string | number
  label: string
  disabled?: boolean
}

export const optionalSelectSchema = z.union([
  z.object({
    label: z.string(),
    value: z.union([z.string(), z.number()]),
    disabled: z.boolean().optional(),
  }),
  z.object({}).strict(),
])

export type Response = {
  statusCode?: number
  statusMessage: string
}

export const nameSchema = z
  .string()
  .min(1, 'Required')
  .refine((value) => !/[\\!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(value), {
    message:
      'Special characters are not allowed (e.g., !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~)',
  })
