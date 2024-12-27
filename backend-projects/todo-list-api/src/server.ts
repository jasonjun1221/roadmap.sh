import express from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import userRoutes from "./routes/userRoutes";
import todoRoutes from "./routes/todoRoutes";

dotenv.config();

const app = express();
const PORT = 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { message: "Too many requests, please try again later." },
});

app.use(limiter);
app.use(express.json());

app.use("/", userRoutes);
app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});

export default app;
