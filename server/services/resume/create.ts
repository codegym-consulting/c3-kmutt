import { resume } from "~/server/drizzle/schema"
import db from "~/server/libs/pg"

type InsertResume = typeof resume.$inferInsert;

export const createResume = async ({ userId = 1, isFileType = false, fileUrls, name, email, phoneNo }: Partial<InsertResume>) => {
    try {
        const values = { userId, isFileType, fileUrls, name, email, phoneNo }
        const updateValues = isFileType ? { isFileType, fileUrls } : { name, email, phoneNo }
        return await db.insert(resume)
                .values(values)
                .onConflictDoUpdate({ 
                    target: resume.userId, 
                    set: updateValues
                 })
    } catch (error) {
        console.error(`Error inserting resume: ${error}`)
        throw error
    }
}