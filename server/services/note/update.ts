import { and, eq } from "drizzle-orm"
import type { UpdateNoteSchema } from "~/server/api/notes/schema"
import { note } from "~/server/drizzle/schema"
import db from "~/server/libs/pg"

export const updateNote = (id: number, body: UpdateNoteSchema, userId: number) => {
    const result = db.update(note).set({ ...body, userId })
        .where(and(
            eq(note.id, id), 
            eq(note.userId, userId))
        )
        .returning({ insertedId: note.id })
    return result
}