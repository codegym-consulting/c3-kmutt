import { z } from 'zod'

export const passwordRule = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .trim()

export const loginSchema = z.object({
  email: z.string().email('Invalid email address').trim(),
  password: passwordRule,
})

export const resetPasswordSchema = z
  .object({
    newPassword: passwordRule,
    confirmPassword: passwordRule,
  })
  .refine(
    (data) =>
      data.confirmPassword === '' || data.newPassword === data.confirmPassword,
    {
      message: 'Password does not match',
      path: ['confirmPassword'], // path of error
    },
  )

export type LoginFormSchema = z.infer<typeof loginSchema>
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
