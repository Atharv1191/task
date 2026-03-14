import cors from "cors";
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";

import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
import connectDB from "./config/db.js";

const app = express();
const port = process.env.PORT || 5000;


// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://task-client-two-omega.vercel.app"
    ],
    credentials: true
  })
);


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Database
connectDB();


// Routes
app.use("/api/user", userRouter);
app.use("/api/tasks", taskRouter);


app.get("/", (req, res) => {
  res.send("API Working");
});


app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});