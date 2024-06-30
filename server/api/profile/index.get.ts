import { getProfile } from "~/server/services/profile/get"

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event)
    try {
      const profile = await getProfile(session.user.id)
      return profile
    } catch (error) {
      console.error(error)
      return null
    }
  })
  
  
  