import { updateNote } from "~/server/services/note/update"
import { updateSchema } from "./schema"
import { createErrorResponse } from "~/server/utils/errorResponse"

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const session = await requireUserSession(event)
    const result = await readValidatedBody(event, body => updateSchema.safeParse(body))

    if (!id) {
      return createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Invalid id'
      })
    }

    if (result.error) {
        return createErrorResponse(result.error)
    }

    try {
      const updateResult = await updateNote(+id, result.data, session.user.id)
      if (updateResult.length === 0) {
        return createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: 'This note not found or has been deleted'
        })
      }

      return {
        statusMessage: 'Note updated successfully'
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  })
  
  
  