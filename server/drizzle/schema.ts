import { pgTable, serial, text, timestamp, integer, jsonb } from "drizzle-orm/pg-core"

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

export const user = pgTable("user", {
	id: serial("id").primaryKey().notNull(),
	email: text("email"),
	name: text("name"),
	photoUrl: text("photoUrl"),
	provider: text("provider"),
	loggedInAt: timestamp("loggedInAt", { withTimezone: true, mode: 'string' }),
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