import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email('Invalid email address').trim(),
    password: z.string().min(8, 'Password must be at least 8 characters').trim(),
})