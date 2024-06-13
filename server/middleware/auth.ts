const publicPaths = [
    '/api/expertises', 
    '/api/interests', 
    '/api/faculties', 
    '/api/departments', 
    '/api/categories', 
    '/api/projects', 
    '/api/users'
]

export default defineEventHandler(async (event) => {
    if (publicPaths.includes(event.path.split('?')[0])) {
        return
    }

    // const session = await requireUserSession(event)
    // if (!session) {
    //     throw createError({ statusMessage: 'Unauthenticated', statusCode: 401 })
    // }

    // event.context.user = session.user
    return
})