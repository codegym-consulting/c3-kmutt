import { pgTable, serial, text, timestamp, integer, jsonb, boolean } from "drizzle-orm/pg-core"

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
});

export const resume = pgTable("resume", {
	id: serial("id").primaryKey().notNull(),
	userId: integer("userId"),
	isFileType: boolean("isFileType").default(false).notNull(),
	fileUrls: jsonb("fileUrls"),
	name: text("name"),
	email: text("email"),
	phoneNo: text("phoneNo"),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).defaultNow(),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }),
});

export const education = pgTable("education", {
	id: serial("id").primaryKey().notNull(),
	resumeId: integer("resumeId"),
	typeOfDegree: text("typeOfDegree"),
	institution: text("institution"),
	fieldOfStudy: text("fieldOfStudy"),
	graduationYear: integer("graduationYear"),
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