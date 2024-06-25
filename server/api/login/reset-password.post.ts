import { eq } from "drizzle-orm";
import { z } from "zod";
import { user } from "~/server/drizzle/schema";
import db from "~/server/libs/pg";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(255),
})

export default defineEventHandler(async (event) => {
    const result = await readValidatedBody(event, body => schema.safeParse(body))

    if (result.error) {
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


    try {
        // Generate a salt and hash the password
        const hashedPassword = await Bun.password.hash(result.data?.password ?? '')
        // const isMatch = await Bun.password.verify(result.data?.password, hashedPassword);
        await db
            .update(user)
            .set({ password: hashedPassword })
            .where(eq(user.email, result.data?.email ?? ''))
  

        return {
            statusMessage: 'Password reset successfully'
        }
    } catch (error) {
        console.log(error)
      return { error };
    }
  });