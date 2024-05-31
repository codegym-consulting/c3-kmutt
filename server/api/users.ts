import db from "../libs/pg";
import { users } from "../schema/user";

export default defineEventHandler(async () => {
  try {
    const result = await db
      .select({ id: users.id, name: users.fullName, phone: users.phone })
      .from(users)
      .orderBy(users.fullName)
      .limit(10);
    return result;
  } catch (error) {
    console.error(error)
  }
})


