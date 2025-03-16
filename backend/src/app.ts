import express from "express";
import authRouter from "./routes/auth.route";
import AppError from "./utils/appError";
import prisma from "./utils/db";
import globalErrorHandler from "./controllers/error.controller";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello from Express + TypeScript!");
});

app.use("/api/v1/auth", authRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`cant find api path ${req.originalUrl}`, 404));
});
// Global error handling middleware
app.use(globalErrorHandler)
async function main() {
  try {
    await prisma.$connect();
    console.log("✅ DB connected successfully");

    // Start the server only after a successful DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

// Initialize database connection & start server
main();
