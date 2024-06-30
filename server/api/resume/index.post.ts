import { createErrorResponse } from "~/server/utils/errorResponse"
import { schema } from "./schema"

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event)
    const result = await readValidatedBody(event, body => schema.safeParse(body))

    if (result.error) {
        return createErrorResponse(result.error)
    }
    
    console.log(result.data)
  
    setResponseStatus(event, 201, `Resume of ${session.user.email} created successfully`)
    return { statusMessage: `Resume of ${session.user.email} created successfully` }
})