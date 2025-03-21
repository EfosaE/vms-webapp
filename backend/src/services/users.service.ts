import bcrypt from "bcryptjs";
import db from "../utils/db";
import { User } from "@prisma/client";


const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return db.user.create({
    data: { name, email, password: hashedPassword },
  });
};

const findUserByEmail = async (email: string): Promise<User | null> => {
  return db.user.findUnique({ where: { email } });
};

const validatePassword = async (
  enteredPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(enteredPassword, hashedPassword);
};

export { createUser, findUserByEmail, validatePassword };
