import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
});


// export const usersRelations = relations(users, ({ many }) => ({
//   posts: many(posts),
// }));

// export const posts = pgTable('posts', {
//   id: serial('id').primaryKey(),
//   content: text('content').notNull(),
//   authorId: integer('author_id').notNull(),
// });

// export const postsRelations = relations(posts, ({ one }) => ({
//   author: one(users, { fields: [posts.authorId], references: [users.id] }),
// }));

