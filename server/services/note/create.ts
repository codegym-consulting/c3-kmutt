import type { CreateNoteSchema } from "~/server/api/notes/schema"
import { note } from "~/server/drizzle/schema"
import db from "~/server/libs/pg"

export const createNote = async (body: CreateNoteSchema, userId: number) => {
    await db.insert(note).values({ ...body, userId })
}