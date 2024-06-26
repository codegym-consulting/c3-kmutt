import { user } from "~/server/drizzle/schema"
import db from "~/server/libs/pg"

export const updateUser = async (email: string, name: string, photoUrl: string, provider: string) => {
    try {
        const values = { email, name, photoUrl, provider, loggedInAt: new Date().toISOString() }
        await db.insert(user)
                .values(values)
                .onConflictDoUpdate({ target: user.email, set: values }) 
    } catch (error) {
        console.error(`Error updating user: ${error}`)
        throw error
    }
}