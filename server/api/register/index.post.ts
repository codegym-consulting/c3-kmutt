import { createUser } from "~/server/services/user/create"
import { schema } from "./schema"
import { createProfile } from "~/server/services/profile/create"

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const requestSchema = schema.omit({ userId: true })
  const result = await readValidatedBody(event, body => requestSchema.safeParse(body))

    if (result.error) {
      const errorDetails = result.error.flatten()
      const errorMessage = result.error.errors
        .map(({ path, message }) => `${path[path.length - 1]} in ${path[0]} is ${message}`)
        .join('\n')

      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: errorMessage,
        data: errorDetails
      })
    }

    console.log(result.data)
    const user = await createUser({ ...session.user, provider: session.provider })
  
    if (user.length > 0) {
      await createProfile({ userId: user[0].insertedId, photoUrl: session.user.photoUrl, ...result.data, })
    }

    setResponseStatus(event, 201)
    return { statusMessage: `User ${session.user.email} created successfully` }
})