import { department, expertise, faculty, interest, profile } from "~/server/drizzle/schema"
import db from "~/server/libs/pg"
import { eq, inArray } from 'drizzle-orm';
import { academicTitles, occupations, organizations } from "~/data/common";

export const getProfile = async (userId: number) => {
    try {
        const [result] = await db.select()
                .from(profile)
                .limit(1)
                .where(eq(profile.userId, userId))

        const [facultyData, departmentData, areaOfInterests, expertises] = await Promise.all([
            result.faculty ? db.select({ label: faculty.name, value: faculty.id })
                .from(faculty)
                .limit(1)
                .where(eq(faculty.id, result.faculty))
                : null,
            result.department ? db.select({ label: department.name, value: department.id })
                .from(department)
                .limit(1)
                .where(eq(department.id, result.department))
                : null,
            db.select({ label: interest.name, value: interest.id })
                .from(interest)
                .where(inArray(interest.id, result.areaOfInterests || [])),
            db.select({ label: expertise.name, value: expertise.id })
                .from(expertise)
                .where(inArray(expertise.id, result.expertises || []))
        ])
        const academicTitle = academicTitles.find(academicTitle => academicTitle.value === result.academicTitle) ?? null
        const occupation = occupations.find(occupation => occupation.value === result.occupation) ?? null
        const organization = organizations.find(organization => organization.value === result.organization) ?? null
        return { 
            ...result,
            occupation,
            organization,
            faculty: facultyData?.[0] || null,
            department: departmentData?.[0] || null,
            academicTitle,
            areaOfInterests, 
            expertises,
            yourProject: 10, 
            yourNetwork: 3, 
        }
    } catch (error) {
        console.error(`Error selecting profile: ${error}`)
        throw error
    }
}