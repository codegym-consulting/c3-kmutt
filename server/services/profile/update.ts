
import { eq } from "drizzle-orm";
import type { UpdateProfileSchema } from "~/server/api/register/schema";
import { profile } from "~/server/drizzle/schema"
import db from "~/server/libs/pg"

export type UpdateProfile = typeof profile.$inferInsert;

export const updateProfile = async ({ 
    email, 
    title, 
    name, 
    surname, 
    nickname,
    shortBio,
    phoneNo,
    linkUrl,
    address,
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
}: Partial<UpdateProfileSchema>, userId: number) => {
    try {
        const values = { 
            email, 
            title, 
            name, 
            surname, 
            nickname,
            shortBio,
            phoneNo,
            linkUrl,
            address,
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

        await db.update(profile)
                .set(values)
                .where(eq(profile.userId, userId))
    } catch (error) {
        console.error(`Error updateing profile: ${error}`)
        throw error
    }
}