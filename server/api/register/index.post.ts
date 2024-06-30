import { createUser } from "~/server/services/user/create"
import { schema } from "./schema"
import { createProfile } from "~/server/services/profile/create"
import { createErrorResponse } from "~/server/utils/errorResponse"

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const requestSchema = schema.omit({ userId: true })
  const result = await readValidatedBody(event, body => requestSchema.safeParse(body))

  if (result.error) {
    return createErrorResponse(result.error)
  }

  const user = await createUser({ ...session.user, provider: session.provider })
  
  if (user.length > 0) {
    await createProfile({ userId: user[0].insertedId, avatarUrl: session.user.photoUrl, ...result.data, })
  }

  setResponseStatus(event, 201, `User ${session.user.email} created successfully`)
  return { statusMessage: `User ${session.user.email} created successfully` }
})