import { and, eq } from "drizzle-orm"
import { note } from "~/server/drizzle/schema"
import db from "~/server/libs/pg"
import { deleteNoteImage } from "~/server/libs/storage"

export const deleteNote = async (id: number, userId: number, userEmail: string) => {
    const result = await db.delete(note).where(and(eq(note.userId, userId), eq(note.id, +id))).returning({ insertedId: note.id, imageUrl: note.imageUrl })
    
    if (result.length > 0 && result[0].imageUrl) {
        deleteNoteImage(userEmail, result[0].imageUrl)
    }

    return result
}