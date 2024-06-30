import { updateProfileSchema } from "../register/schema"
import { updateProfile } from "~/server/services/profile/update"

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event)
    const requestSchema = updateProfileSchema.omit({ userId: true })
    const result = await readValidatedBody(event, body => requestSchema.safeParse(body))

    if (result.error) {
        return createErrorResponse(result.error)
    }

    try {
      await updateProfile(result.data, session.user.id)
      return {
        statusMessage: 'Profile updated successfully',
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  })
  
  
  