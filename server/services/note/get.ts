import { eq, desc } from "drizzle-orm"
import { note } from "~/server/drizzle/schema"
import db from "~/server/libs/pg"

export const getNote = async (userId: number) => {
    const result = await db.select({
        id: note.id,
        type: note.type,
        title: note.title,
        content: note.content,
        imageUrl: note.imageUrl,
        createdAt: note.createdAt,
    })
    .from(note)
    .where(eq(note.userId, userId))
    .orderBy(desc(note.createdAt))

  return result
}