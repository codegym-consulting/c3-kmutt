import { users } from "../drizzle/schema";
import db from "../libs/pg";

export default defineEventHandler(async () => {
  try {
    const result = await db
      .select({ id: users.id, name: users.full_name, phone: users.phone })
      .from(users)
      .orderBy(users.full_name)
      .limit(10);
    return result;
  } catch (error) {
    console.error(error)
  }
})


