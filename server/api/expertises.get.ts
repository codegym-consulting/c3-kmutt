import { expertise } from "../drizzle/schema";
import db from "../libs/pg";

export default defineEventHandler(async () => {
  try {
    const result = await db
      .select({ label: expertise.name, value: expertise.id })
      .from(expertise)
      .orderBy(expertise.id)
    return result;
  } catch (error) {
    console.error(error)
  }
})


