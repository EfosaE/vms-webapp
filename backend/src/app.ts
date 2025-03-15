import express from "express";
import authRouter from "./routes/auth.route";
import AppError from "./utils/appError";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from Express + TypeScript!");
});
app.use('/api/v1/auth/login', authRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`cant find api path ${req.originalUrl}`, 404))
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
