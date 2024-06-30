import { user } from "~/server/drizzle/schema"
import db from "~/server/libs/pg"
import { eq } from 'drizzle-orm';

export const getUser = async (email: string) => {
    try {
        return await db.select({ 
                id: user.id, 
                name: user.name, 
                email: user.email, 
                photoUrl: user.photoUrl, 
                provider: user.provider
            })
            .from(user)
            .limit(1)
            .where(eq(user.email, email))
    } catch (error) {
        console.error(`Error selecting user: ${error}`)
        throw error
    }
}