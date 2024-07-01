import { and, eq } from "drizzle-orm"
import type { UpdateNoteSchema } from "~/server/api/notes/schema"
import { note } from "~/server/drizzle/schema"
import db from "~/server/libs/pg"
import { deleteNoteImage } from "~/server/libs/storage"

export const updateNote = async (id: number, body: UpdateNoteSchema, userId: number, userEmail: string) => {
    const result = await db.update(note).set({ ...body, userId })
        .where(and(
            eq(note.id, id), 
            eq(note.userId, userId))
        )
        .returning({ insertedId: note.id, imageUrl: note.imageUrl })
    
    if (body.imageUrl === null && result[0].imageUrl) {
        deleteNoteImage(userEmail, result[0].imageUrl)
    }
    return result
}