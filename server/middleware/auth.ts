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

    const { user } = await getUserSession(event)
    if (user) {
        const userData = (await getUser(user.email))[0]
        setUserSession(event, {
            ...user,
            isRegistered: Boolean(userData),
            provider: userData.provider,
        })
    }
    // const session = await requireUserSession(event)
    // if (!session) {
    //     throw createError({ statusMessage: 'Unauthenticated', statusCode: 401 })
    // }

    return
})