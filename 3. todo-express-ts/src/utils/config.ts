import "dotenv/config";

export const PORT = process.env.PORT || 3000;
export const PG_USER = process.env.PG_USER;
export const PG_PWD = process.env.PG_PWD;
export const PG_HOST = process.env.PG_HOST;
export const PG_DB =
  process.env.NODE_ENV === "test" ? process.env.TEST_PG_DB : process.env.PG_DB;
export const PG_PORT = process.env.PG_PORT;
export const DATABASE_URI = process.env.DATABASE_URI;
