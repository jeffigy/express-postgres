import { describe, test } from "@jest/globals";
import supertest from "supertest";
import app from "../app";
import { query } from "../utils/db";
const api = supertest(app);
import format from "pg-format";
import { initialTodos } from "./test_helpers";

beforeEach(async () => {
  await query("TRUNCATE TABLE todos");
  const queryText = format(
    `INSERT INTO todos (title, description, is_complete, created_at) VALUES %L`,
    initialTodos
  );

  await query(queryText);
});

describe("todo app test", () => {
  test("notes are returned as JSON", async () => {
    await api
      .get("/todos")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});
