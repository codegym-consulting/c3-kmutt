import { expertise } from "../drizzle/schema";
import db from "../libs/pg";

export default defineEventHandler(async () => {
  try {
    const result = await db
      .select({ id: expertise.id, value: expertise.id, label: expertise.name })
      .from(expertise)
      .orderBy(expertise.id)
    return result;
  } catch (error) {
    console.error(error)
  }
})


