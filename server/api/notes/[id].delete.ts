import { deleteNote } from "~/server/services/note/delete"

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const session = await requireUserSession(event)

    if (!id) {
      return createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Invalid id'
      })
    }

    try {
      const result = await deleteNote(+id, session.user.id, session.user.email)
      if (result.length === 0) {
        return createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: 'This note not found or has been deleted'
        })
      }
      return {
        statusMessage: 'Note deleted successfully'
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  })
  
  
  