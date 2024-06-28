import { profile } from "~/server/drizzle/schema"
import db from "~/server/libs/pg"
import { eq } from 'drizzle-orm';

export const getProfile = async (userId: number) => {
    try {
        return await db.select()
                .from(profile)
                .limit(1)
                .where(eq(profile.userId, userId))
    } catch (error) {
        console.error(`Error selecting profile: ${error}`)
        throw error
    }
}