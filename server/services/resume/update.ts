import { eq } from "drizzle-orm";
import { resume } from "~/server/drizzle/schema"
import db from "~/server/libs/pg"

type InsertResume = typeof resume.$inferInsert;

export const updateResume = async ({ userId = 1, photoUrl }: Partial<InsertResume>) => {
    try {
        const values = { userId, photoUrl }
        return await db.update(resume)
                .set(values)
                .where(eq(resume.userId, userId))
    } catch (error) {
        console.error(`Error updating resume: ${error}`)
        throw error
    }
}