import { schema } from "./schema"

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const result = await readValidatedBody(event, body => schema.safeParse(body))

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

    console.log(session.user.email)
    console.log(result.data)
  
    setResponseStatus(event, 201)
    return { statusMessage: `User ${session.user.email} created successfully` }
})