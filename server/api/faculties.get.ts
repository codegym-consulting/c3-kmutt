import { faculty } from "../drizzle/schema"
import db from "../libs/pg"

export default defineEventHandler(async () => {
  try {
    const result = await db
      .select({ label: faculty.name, value: faculty.id })
      .from(faculty)
      .orderBy(faculty.id)
    return result
  } catch (error) {
    console.error(error)
    return []
  }
})


