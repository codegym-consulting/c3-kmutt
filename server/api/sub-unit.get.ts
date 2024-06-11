import { orgUnit } from "../drizzle/schema";
import db from "../libs/pg";

export default defineEventHandler(async (event) => {
  const _session = await requireUserSession(event)

  const result = await db
    .select({ label: orgUnit.name, value: orgUnit.id, disabled: orgUnit.is_header })
    .from(orgUnit)
    .orderBy(orgUnit.id)
  return result;
})


