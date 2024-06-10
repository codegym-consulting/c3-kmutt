const excludePaths = [
    '/api/expertises', 
    '/api/interests', 
    '/api/sub-unit', 
    '/api/categories', 
    '/api/project', 
    '/api/user',
    '/api/register',
    '/api/resume',
    '/api/upload/resume',
    '/api/upload/profile'
]

export default defineEventHandler(async (event) => {
    if (excludePaths.includes(event.path.split('?')[0])) {
        return
    }

    // const session = await requireUserSession(event)
    // if (!session) {
    //     throw createError({ statusMessage: 'Unauthenticated', statusCode: 401 })
    // }

    // event.context.user = session.user
    return
})