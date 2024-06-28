import { eq } from "drizzle-orm"
import { user } from "~/server/drizzle/schema"
import db from "~/server/libs/pg"

export const updateUser = async (email: string, name: string, photoUrl: string, provider: string) => {
    try {
        const values = { email, name, photoUrl, provider, loggedInAt: new Date().toISOString() }
        await db.update(user)
                .set(values)
                .where(eq(user.email, email))
    } catch (error) {
        console.error(`Error updating user: ${error}`)
        throw error
    }
}