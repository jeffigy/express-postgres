import "express-async-errors";
import express, { json } from "express";
import apiRoute from "./routes";
import { connectDb } from "./lib/connect-db";
import errorHandler from "./middlewares/error.middleware";

connectDb();

const app = express();

app.use(json());

app.use("/api", apiRoute);

app.use(errorHandler);

export default app;
