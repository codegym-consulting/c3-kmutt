import { and, eq } from "drizzle-orm"
import { note } from "~/server/drizzle/schema"
import db from "~/server/libs/pg"
import { deleteFile } from "~/server/libs/storage"

export const deleteNote = async (id: number, userId: number, userEmail: string) => {
    const result = await db.delete(note).where(and(eq(note.userId, userId), eq(note.id, +id))).returning({ insertedId: note.id, imageUrl: note.imageUrl })
    
    if (result.length > 0 && result[0].imageUrl) {
        const rawPath = result[0].imageUrl.split('/')
        const fileName = rawPath[rawPath.length - 1]
        const destination = `user/${userEmail}/notes/${fileName}`
        await deleteFile(destination)
    }

    return result
}