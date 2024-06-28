import { eq } from "drizzle-orm"
import { user } from "~/server/drizzle/schema"
import db from "~/server/libs/pg"

type InsertUser = typeof user.$inferInsert;
type AtLeastOne<T, U = {[K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

export const updateUser = async ({ email, name, photoUrl, provider }: AtLeastOne<InsertUser, { email: { email: string } }>) => {
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