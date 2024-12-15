import {
  varchar,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  blog_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  content: varchar({ length: 255 }).notNull(),
  category: varchar({ length: 255 }).notNull(),
  tags: text().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});
