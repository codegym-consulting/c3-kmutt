import { getProfile } from "~/server/services/profile/get"

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event)
    try {
      const profiles = await getProfile(session.user.id)
      return { yourProjects: 0, yourNetwork: 0, ...profiles[0] }
    } catch (error) {
      console.error(error)
      return null
    }
  })
  
  
  