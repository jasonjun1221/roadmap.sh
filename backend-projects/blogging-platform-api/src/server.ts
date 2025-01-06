import express from "express";
import connectDB from "./config/mongodb";
import postRoutes from "./routes/post.route";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use("/posts", postRoutes);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
