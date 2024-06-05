import db from "../libs/pg";
import { expertise } from "../schema/schema";

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


