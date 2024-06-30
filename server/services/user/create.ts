import { user } from "~/server/drizzle/schema"
import db from "~/server/libs/pg"

type InsertUser = typeof user.$inferInsert;
export const createUser = async ({ email, name, photoUrl, provider }: Omit<InsertUser, 'id' | 'loggedInAt' | 'password'>) => {
    try {
        const values = { email, name, photoUrl, provider, loggedInAt: new Date().toISOString() }
        return await db.insert(user)
                .values(values)
                .onConflictDoNothing({ target: user.email })
                .returning({ insertedId: user.id })
    } catch (error) {
        console.error(`Error inserting user: ${error}`)
        throw error
    }
}