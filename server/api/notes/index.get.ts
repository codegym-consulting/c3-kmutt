import { eq, desc } from "drizzle-orm"
import { note } from "~/server/drizzle/schema"
import db from "~/server/libs/pg"

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event)

    try {
      const result = await db.select({
            id: note.id,
            title: note.title,
            content: note.content,
            type: note.type,
            imageUrl: note.imageUrl,
            createdAt: note.createdAt,
        })
      .from(note)
      .where(eq(note.userId, session.user.id))
      .orderBy(desc(note.createdAt))
      return result
    } catch (error) {
      console.error(error)
      return []
    }
  })
  
  
  