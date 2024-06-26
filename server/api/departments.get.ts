import { eq } from "drizzle-orm"
import { department } from "../drizzle/schema"
import db from "../libs/pg"

export default defineEventHandler(async (event) => {  
  try {
    const query = getQuery(event)
    if (!query.facultyId) {
      return []
    }
    const result = await db
      .select({ label: department.name, value: department.id })
      .from(department)
      .where(eq(department.facultyId, Number(query.facultyId)))
      .orderBy(department.id)
    return result
  } catch (error) {
    console.error(error)
    return []
  }
})


