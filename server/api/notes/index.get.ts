import { getNote } from "~/server/services/note/get"

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event)

    try {
      return await getNote(session.user.id)
    } catch (error) {
      console.error(error)
      return []
    }
  })
  
  
  