import { createId } from "@paralleldrive/cuid2";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const blogs = pgTable("blogs", {
  blogId: varchar("blog_id").primaryKey().$defaultFn(createId),
  title: varchar().notNull(),
  content: varchar().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.userId),
});
