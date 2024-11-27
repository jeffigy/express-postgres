import "dotenv/config";

const PORT = process.env.PORT ?? 3000;
const PG_USER = process.env.PG_USER;
const PG_PWD = process.env.PG_PWD;
const PG_DB = process.env.PG_DB;
const PG_PORT = process.env.PG_PORT;
const PG_HOST = process.env.PG_HOST;
const CORS_WHITELIST = process.env.CORS_WHITELIST.split(",") ?? [];

export { PORT, PG_USER, PG_PWD, PG_DB, PG_PORT, PG_HOST, CORS_WHITELIST };
