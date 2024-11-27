import pg from "pg";
import { PG_DB, PG_HOST, PG_PORT, PG_PWD, PG_USER } from "./config.mjs";

const { Pool } = pg;
const pool = new Pool({
  user: PG_USER,
  password: PG_PWD,
  host: PG_HOST,
  database: PG_DB,
  port: PG_PORT,
});

export default pool;
