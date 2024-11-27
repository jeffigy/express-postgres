import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  password: "admin",
  database: "todo_database",
  host: "localhost",
  port: 5432,
});

export default pool;
