import "express-async-errors";
import express from "express";
import { connectDb } from "./db";
import blogRoute from "./routes/blogRoute";

connectDb();
const app = express();

app.use(express.json());

app.use("/blogs", blogRoute);

export default app;
