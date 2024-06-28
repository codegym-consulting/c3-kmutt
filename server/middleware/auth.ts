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
        const sessionData = {
            user: {
              id: userData ? userData.id : 0,
              email: user.email,
              name: user.name,
              photoUrl: user.photoUrl,
              emailVerified: user.emailVerified
            }
        }
        setUserSession(event, {
            ...sessionData,
            isRegistered: userData ? true : false,
        })
        event.context.user = user
    }

    // const session = await requireUserSession(event)
    // if (!session) {
    //     throw createError({ statusMessage: 'Unauthenticated', statusCode: 401 })
    // }

    return
})