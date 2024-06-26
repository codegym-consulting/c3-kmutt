import { ilike } from "drizzle-orm"
import { expertise } from "../drizzle/schema"
import db from "../libs/pg"

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const result = await db
      .select({ label: expertise.name, value: expertise.id })
      .from(expertise)
      .where(ilike(expertise.name, `%${query.query ?? ''}%`))
      .orderBy(expertise.id)
    return result
  } catch (error) {
    console.error(error)
    return []
  }
})


