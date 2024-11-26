import { drizzle } from "drizzle-orm/neon-http";
import { DATABASE_URL } from "../utils/config";

export const db = drizzle(DATABASE_URL);
