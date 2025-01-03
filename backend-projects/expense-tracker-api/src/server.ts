import express from "express";
import authRoutes from "./routes/auth.routes";
import expenseRoutes from "./routes/expense.routes";
import { authenticate } from "./middlewares/auth";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/expenses", authenticate, expenseRoutes);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
