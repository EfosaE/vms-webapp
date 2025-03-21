import { Router } from "express";
import { getUserProfile } from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.route("/profile").get(authMiddleware, getUserProfile);

export default userRouter;
