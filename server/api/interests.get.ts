import db from "../libs/pg";
import { expertise } from "../schema/schema";

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


