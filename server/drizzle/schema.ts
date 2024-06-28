import { pgTable, pgEnum, serial, text, timestamp, integer, jsonb, uniqueIndex, boolean } from "drizzle-orm/pg-core"

export const academic_title = pgEnum("academic_title", ['dr', 'prof', 'prof_dr', 'asst_prof', 'asst_prof_dr', 'assoc_prof', 'assoc_prof_dr'])
export const profile_title = pgEnum("profile_title", ['mr', 'miss', 'mrs'])
export const type_of_source = pgEnum("type_of_source", ['book', 'book_section', 'journal_article', 'article_in_a_periodical', 'conference', 'report', 'website', 'electronic', 'art', 'sound_recording', 'performance', 'film', 'interview', 'patent'])
export const type_of_degree = pgEnum("type_of_degree", ['diploma', 'bachelor', 'master', 'doctorate'])

export const expertise = pgTable("expertise", {
	id: serial("id").primaryKey().notNull(),
	name: text("name"),
});

export const activity = pgTable("activity", {
	id: serial("id").primaryKey().notNull(),
	userId: text("userId").notNull(),
	title: text("title"),
	description: text("description"),
	thumbnailUrl: text("thumbnailUrl").default(''),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const bookmark = pgTable("bookmark", {
	id: serial("id").primaryKey().notNull(),
	userId: text("userId").notNull(),
});

export const faculty = pgTable("faculty", {
	id: serial("id").primaryKey().notNull(),
	name: text("name"),
});

export const department = pgTable("department", {
	id: serial("id").primaryKey().notNull(),
	name: text("name"),
	facultyId: integer("facultyId"),
});

export const project = pgTable("project", {
	id: serial("id").primaryKey().notNull(),
	name: text("name"),
	summary: text("summary"),
	categories: jsonb("categories"),
	hashtags: jsonb("hashtags"),
	researchTheme: integer("researchTheme"),
	SDGGoal: integer("SDGGoal"),
	imageUrl: text("imageUrl"),
	imageUrls: jsonb("imageUrls"),
});

export const user = pgTable("user", {
	id: serial("id").primaryKey().notNull(),
	email: text("email"),
	name: text("name"),
	photoUrl: text("photoUrl"),
	provider: text("provider"),
	loggedInAt: timestamp("loggedInAt", { withTimezone: true, mode: 'string' }),
	password: text("password"),
},
(table) => {
	return {
		email: uniqueIndex("email").using("btree", table.email),
	}
});

export const education = pgTable("education", {
	id: serial("id").primaryKey().notNull(),
	resumeId: integer("resumeId"),
	typeOfDegree: text("typeOfDegree"),
	institution: text("institution"),
	fieldOfStudy: text("fieldOfStudy"),
	graduationYear: integer("graduationYear"),
});

export const note = pgTable("note", {
	id: serial("id").primaryKey().notNull(),
	userId: integer("userId"),
	isTextOnly: boolean("isTextOnly"),
	title: text("title"),
	content: text("content"),
	imageUrl: text("imageUrl"),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const experience = pgTable("experience", {
	id: serial("id").primaryKey().notNull(),
	resumeId: integer("resumeId"),
	title: text("title"),
	company: text("company"),
	location: text("location"),
	startDate: timestamp("startDate", { withTimezone: true, mode: 'string' }),
	endDate: timestamp("endDate", { withTimezone: true, mode: 'string' }),
});

export const research = pgTable("research", {
	id: serial("id").primaryKey().notNull(),
	resumeId: integer("resumeId"),
	name: text("name"),
	categories: jsonb("categories"),
	date: timestamp("date", { withTimezone: true, mode: 'string' }),
});

export const academic_service = pgTable("academic_service", {
	id: integer("id").primaryKey().notNull(),
	resumeId: integer("resumeId"),
	name: text("name"),
	categories: jsonb("categories"),
	date: timestamp("date", { withTimezone: true, mode: 'string' }),
});

export const category = pgTable("category", {
	id: integer("id"),
	name: text("name"),
});

export const resume = pgTable("resume", {
	userId: integer("userId").primaryKey().notNull(),
	isFileType: boolean("isFileType").default(false).notNull(),
	fileUrls: jsonb("fileUrls"),
	name: text("name"),
	email: text("email"),
	phoneNo: text("phoneNo"),
	photoUrl: text("photoUrl"),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).defaultNow(),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const profile = pgTable("profile", {
	userId: integer("userId").primaryKey().notNull(),
	title: profile_title("title"),
	name: text("name"),
	surname: text("surname"),
	nickname: text("nickname"),
	photoUrl: text("photoUrl"),
	phoneNo: text("phoneNo"),
	email: text("email"),
	linkUrl: text("linkUrl"),
	address: text("address"),
	shortBio: text("shortBio"),
	nationality: text("nationality"),
	occupation: text("occupation"),
	organization: text("organization"),
	faculty: integer("faculty"),
	department: integer("department"),
	academicTitle: academic_title("academicTitle"),
	expertises: jsonb("expertises"),
	areaOfInterests: jsonb("areaOfInterests"),
	teachingExperiences: jsonb("teachingExperiences"),
});