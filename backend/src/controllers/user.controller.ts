import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import AppError from "../utils/appError";
import {
  findUserByEmail,
  createUser,
  validatePassword,
} from "../services/users.service";
import { UserWithPassword } from "types";

interface AuthRequest extends Request {
  body: UserWithPassword;
}

const signUp = async (req: AuthRequest, res: Response, next: NextFunction) => {
  console.log(req.body)
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return next(new AppError("Email and password are required", 400));
    }

    const user = await createUser(name, email, password);
    res
      .status(201)
      .json({ status: "success", data: { id: user.id, email: user.email } });
  } catch (error) {
    next(error);
  }
};

const login = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

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

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({ status: "success", token });
  } catch (error) {
    next(error);
  }
};

export { signUp, login };
