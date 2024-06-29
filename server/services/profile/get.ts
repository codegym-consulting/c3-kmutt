import { expertise, interest, profile } from "~/server/drizzle/schema"
import db from "~/server/libs/pg"
import { eq, inArray } from 'drizzle-orm';

export const getProfile = async (userId: number) => {
    try {
        const [result] = await db.select()
                .from(profile)
                .limit(1)
                .where(eq(profile.userId, userId))

        const [areaOfInterests, expertises] = await Promise.all([
            db.select({ label: interest.name, value: interest.id })
                .from(interest)
                .where(inArray(interest.id, result.areaOfInterests || [])),
            db.select({ label: expertise.name, value: expertise.id })
                .from(expertise)
                .where(inArray(expertise.id, result.expertises || []))
        ])

        return { ...result, areaOfInterests, expertises }
    } catch (error) {
        console.error(`Error selecting profile: ${error}`)
        throw error
    }
}