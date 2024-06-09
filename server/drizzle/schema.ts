import { pgTable, serial, text, varchar, boolean } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
	id: serial("id").primaryKey().notNull(),
	full_name: text("full_name"),
	phone: varchar("phone", { length: 256 }),
});

export const org = pgTable("org", {
	name: text("name").primaryKey().notNull(),
});

export const expertise = pgTable("expertise", {
	id: serial("id").primaryKey().notNull(),
	name: text("name"),
});

export const orgUnit = pgTable("orgUnit", {
	id: serial("id").primaryKey().notNull(),
	name: text("name"),
	is_header: boolean("is_header").default(false),
});