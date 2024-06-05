import {
  pgTable,
  serial,
  text,
  varchar,
  pgSchema,
  bigint,
} from "drizzle-orm/pg-core";

export const drizzle = pgSchema("drizzle");

export const expertise = pgTable("expertise", {
  id: serial("id").primaryKey().notNull(),
  name: text("name"),
});

export const orgUnit = pgTable("org_unit", {
  id: serial("id").primaryKey().notNull(),
});

export const org = pgTable("org", {
  name: text("name").primaryKey().notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
});

export const drizzleMigrationsInDrizzle = drizzle.table(
  "__drizzle_migrations",
  {
    id: serial("id").primaryKey().notNull(),
    hash: text("hash").notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    createdAt: bigint("created_at", { mode: "number" }),
  },
);