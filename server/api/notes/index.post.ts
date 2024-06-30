import { createNote } from "~/server/services/note/create"
import { refinedSchema } from "./schema"
import { createErrorResponse } from "~/server/utils/errorResponse"

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event)
    const result = await readValidatedBody(event, body => refinedSchema.safeParse(body))

    if (result.error) {
        return createErrorResponse(result.error)
    }

    try {
      await createNote(result.data, session.user.id)
      setResponseStatus(event, 201, 'Note created successfully')
      return {
        statusMessage: 'Note created successfully'
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  })
  
  
  