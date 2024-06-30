import { eq } from "drizzle-orm"
import { z } from "zod"
import { user } from "~/server/drizzle/schema"
import db from "~/server/libs/pg"
import sendEmail from "~/server/libs/resend"

const schema = z.object({
    email: z.string().email(),
})

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, body => schema.safeParse(body))

    try {
        const result = await db
            .select({ email: user.email })
            .from(user)
            .where(eq(user.email, body.data?.email ?? '')).limit(1)
  
        if (result.length === 0) {
            return createError({
                statusCode: 400,
                statusMessage: "Bad Request",
                message: 'User not found'
            })
        }

        sendEmail(result[0].email ?? '', 'Reset password', 'Please click the link to reset your password')
        return 'ok'
    } catch (error) {
      return { error }
    }
  })