import "express-async-errors";
import express from "express";
import blogRoute from "./routes/blogRoute";
import { connectDb } from "./db";
import userRoute from "./routes/userRoute";
import petRoute from "./routes/petRoute";

connectDb();

const app = express();
app.use(express.json());

app.use("/blogs", blogRoute);
app.use("/users", userRoute);
app.use("/pets", petRoute);

export default app;
