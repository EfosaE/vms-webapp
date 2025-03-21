import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import AppError from "../utils/appError";
import {
  findUserByEmail,
  createUser,
  validatePassword,
} from "../services/users.service";
import { IUserWithPassword } from "types";
import catchAsync from "../utils/catchAsync";
import { env } from "../constants";

const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const { email, password, name } = req.body as IUserWithPassword;

    if (!email || !password) {
      return next(new AppError("Email and password are required", 400));
    }

    const user = await createUser(name, email, password);
    return res
      .status(201)
      .json({ status: "success", data: { id: user.id, email: user.email } });
  }
);

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as IUserWithPassword;

    if (!email || !password) {
      return next(new AppError("Email and password are required", 400));
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }

    const isPasswordValid = await validatePassword(password, user.password);
    if (!isPasswordValid) {
      return next(new AppError("Invalid email or password", 401));
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    return res.json({accessToken});
  }
);

export { signUp, login };
