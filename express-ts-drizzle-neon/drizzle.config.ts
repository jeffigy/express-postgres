import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "./src/utils/config";
export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
