import "express-async-errors";
import express from "express";
import blogRoute from "./routes/blogRoute";

const app = express();
app.use(express.json());

app.use("/blogs", blogRoute);

export default app;
