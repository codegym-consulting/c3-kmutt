import { pgTable, serial, text, boolean, timestamp, integer } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const expertise = pgTable("expertise", {
	id: serial("id").primaryKey().notNull(),
	name: text("name"),
});

export const orgUnit = pgTable("orgUnit", {
	id: serial("id").primaryKey().notNull(),
	name: text("name"),
	is_header: boolean("is_header").default(false),
});

export const project = pgTable("project", {
	id: serial("id").primaryKey().notNull(),
});

export const profile = pgTable("profile", {
	id: serial("id").primaryKey().notNull(),
	photoUrl: text("photoUrl"),
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