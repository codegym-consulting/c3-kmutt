import { pgTable, pgEnum, serial, text, timestamp, integer, jsonb, uniqueIndex, boolean } from "drizzle-orm/pg-core"

const defaultAvatarUrl = "https://storage.googleapis.com/c3-kmutt/default/user.svg"
export const academic_title = pgEnum("academic_title", ['dr', 'prof', 'prof_dr', 'asst_prof', 'asst_prof_dr', 'assoc_prof', 'assoc_prof_dr'])
export const occupation_type = pgEnum("occupation_type", ['student',  'instructor', 'lecturer', 'researcher', 'research_assistant', 'support', 'consultant'])
export const note_type = pgEnum("note_type", ['text', 'image'])
export const profile_title = pgEnum("profile_title", ['mr', 'miss', 'mrs'])
export const type_of_degree = pgEnum("type_of_degree", ['diploma', 'bachelor', 'master', 'doctorate'])
export const type_of_source = pgEnum("type_of_source", ['book', 'book_section', 'journal_article', 'article_in_a_periodical', 'conference', 'report', 'website', 'electronic', 'art', 'sound_recording', 'performance', 'film', 'interview', 'patent'])

export const expertise = pgTable("expertise", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
});

export const notification = pgTable("notification", {
	id: serial("id").primaryKey().notNull(),
	userId: text("userId").notNull(),
	title: text("title").notNull(),
	content: text("content").notNull(),
	thumbnailUrl: text("thumbnailUrl").notNull(),
	externalUrl: text("externalUrl").notNull(),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const bookmark = pgTable("bookmark", {
	id: serial("id").primaryKey().notNull(),
	userId: text("userId").notNull(),
});

export const faculty = pgTable("faculty", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
});

export const department = pgTable("department", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
	facultyId: integer("facultyId").notNull(),
});

export const project = pgTable("project", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
	summary: text("summary").notNull(),
	categories: jsonb("categories").$type<number[]>(),
	hashtags: jsonb("hashtags").$type<string[]>(),
	researchTheme: integer("researchTheme"),
	SDGGoal: integer("SDGGoal"),
	imageUrl: text("imageUrl"),
	imageUrls: jsonb("imageUrls").$type<string[]>(),
});

export const user = pgTable("user", {
	id: serial("id").primaryKey().notNull(),
	email: text("email").notNull(),
	name: text("name").notNull(),
	photoUrl: text("photoUrl").notNull().default(defaultAvatarUrl),
	provider: text("provider").notNull().default("password"),
	loggedInAt: timestamp("loggedInAt", { withTimezone: true, mode: 'string' }).defaultNow(),
	password: text("password"),
},
(table) => {
	return {
		email: uniqueIndex("email").using("btree", table.email),
	}
});

export const education = pgTable("education", {
	id: serial("id").primaryKey().notNull(),
	resumeId: integer("resumeId").notNull(),
	typeOfDegree: text("typeOfDegree"),
	institution: text("institution"),
	fieldOfStudy: text("fieldOfStudy"),
	graduationYear: integer("graduationYear"),
});

export const experience = pgTable("experience", {
	id: serial("id").primaryKey().notNull(),
	resumeId: integer("resumeId").notNull(),
	title: text("title"),
	company: text("company"),
	location: text("location"),
	startDate: timestamp("startDate", { withTimezone: true, mode: 'string' }),
	endDate: timestamp("endDate", { withTimezone: true, mode: 'string' }),
});

export const research = pgTable("research", {
	id: serial("id").primaryKey().notNull(),
	resumeId: integer("resumeId").notNull(),
	name: text("name").notNull(),
	categories: jsonb("categories").$type<number[]>(),
	date: timestamp("date", { withTimezone: true, mode: 'string' }),
});

export const academic_service = pgTable("academic_service", {
	id: integer("id").primaryKey().notNull(),
	resumeId: integer("resumeId").notNull(),
	name: text("name").notNull(),
	categories: jsonb("categories").$type<number[]>(),
	date: timestamp("date", { withTimezone: true, mode: 'string' }),
});

export const category = pgTable("category", {
	id: integer("id").notNull(),
	name: text("name").notNull(),
});

export const profile = pgTable("profile", {
	userId: integer("userId").primaryKey().notNull(),
	title: profile_title("title").notNull(),
	name: text("name").notNull(),
	surname: text("surname").notNull(),
	nickname: text("nickname"),
	avatarUrl: text("avatarUrl"),
	phoneNo: text("phoneNo"),
	email: text("email").notNull(),
	linkUrl: text("linkUrl"),
	address: text("address"),
	shortBio: text("shortBio"),
	nationality: text("nationality").notNull(),
	occupation: occupation_type("occupation").notNull(),
	organization: text("organization").notNull(),
	faculty: integer("faculty").notNull(),
	department: integer("department").notNull(),
	academicTitle: academic_title("academicTitle"),
	expertises: jsonb("expertises").$type<number[]>(),
	areaOfInterests: jsonb("areaOfInterests").$type<number[]>(),
	teachingExperiences: jsonb("teachingExperiences").$type<string[]>(),
});

export const resume = pgTable("resume", {
	userId: integer("userId").primaryKey().notNull(),
	isFileType: boolean("isFileType").default(false).notNull(),
	fileUrls: jsonb("fileUrls").$type<string[]>(),
	name: text("name").notNull(),
	email: text("email"),
	phoneNo: text("phoneNo"),
	avatarUrl: text("avatarUrl"),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).defaultNow(),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const interest = pgTable("interest", {
	id: integer("id").notNull(),
	name: text("name").notNull(),
});

export const note = pgTable("note", {
	id: serial("id").primaryKey().notNull(),
	userId: integer("userId").notNull(),
	type: note_type("type").notNull().default("text"),
	title: text("title").notNull(),
	content: text("content"),
	imageUrl: text("imageUrl"),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).defaultNow(),
});