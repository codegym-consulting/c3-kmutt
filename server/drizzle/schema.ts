import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: serial("id").primaryKey().notNull(),
	full_name: text("full_name"),
	phone: varchar("phone", { length: 256 }),
});

export const org_unit = pgTable("org_unit", {
	id: serial("id").primaryKey().notNull(),
});

export const org = pgTable("org", {
	name: text("name").primaryKey().notNull(),
});

export const expertise = pgTable("expertise", {
	id: serial("id").primaryKey().notNull(),
	name: text("name"),
});