
import type { RegisterUserSchema } from "~/server/api/register/schema";
import { profile } from "~/server/drizzle/schema"
import db from "~/server/libs/pg"

// type InsertProfile = typeof profile.$inferInsert;

export const createProfile = async ({ 
    userId = 1, 
    email, 
    title, 
    name, 
    surname, 
    nationality, 
    academicTitle, 
    occupation, 
    organization, 
    department, 
    faculty, 
    teachingExperiences, 
    areaOfInterests, 
    expertises,
    avatarUrl
}: Partial<RegisterUserSchema>) => {
    try {
        const values = { 
            userId, 
            email, 
            title, 
            name, 
            surname, 
            nationality, 
            academicTitle, 
            occupation, 
            organization, 
            department, 
            faculty, 
            teachingExperiences, 
            areaOfInterests, 
            expertises,
            avatarUrl
        }

        await db.insert(profile)
                .values(values)
                .onConflictDoNothing({ target: profile.userId })
    } catch (error) {
        console.error(`Error inserting profile: ${error}`)
        throw error
    }
}