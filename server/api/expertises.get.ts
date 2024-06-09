import { ilike } from "drizzle-orm";
import { expertise } from "../drizzle/schema";
import db from "../libs/pg";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const dbQuery = db
      .select({ label: expertise.name, value: expertise.id })
      .from(expertise)
      .where(ilike(expertise.name, `%${query.query ?? ''}%`))
      .orderBy(expertise.id);

    const result = await dbQuery;
    return result;
  } catch (error) {
    console.error(error)
  }
})


