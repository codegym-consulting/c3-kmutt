import type { ZodError } from "zod"

export const createErrorResponse = (error: ZodError) => {
    const errorDetails = error.flatten()
    const errorMessage = error.errors
    .map(({ path, message }) => `${path[path.length - 1]} in ${path[0]} is ${message}`)
    .join('\n')

    return createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: errorMessage,
        data: errorDetails
    })
}

