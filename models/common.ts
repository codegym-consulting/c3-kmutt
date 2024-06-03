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
  })
  .strict()

export const nameSchema = z
  .string()
  .min(1, 'Required')
  .refine((value) => !/[\!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(value), {
    message:
      'Special characters are not allowed (e.g., !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~)',
  })
