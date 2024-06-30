import { getUser } from "../services/user/get"

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

    const session = await getUserSession(event)
    if (session.user) {
        const userData = (await getUser(session.user.email))[0]
        const sessionData = {
            user: { ...userData, id: userData ? userData.id : 0, emailVerified: session.user.emailVerified },
        }
        await setUserSession(event, {
            ...sessionData,
            isRegistered: !!userData,
            provider: session.provider
        })
        event.context.user = sessionData.user
    }
    // const session = await requireUserSession(event)
    // if (!session) {
    //     return createError({ statusMessage: 'Unauthenticated', statusCode: 401 })
    // }

    return
})