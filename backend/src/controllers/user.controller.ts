import { Response, Request } from "express";
import catchAsync from "../utils/catchAsync";
import db from "../utils/db";
import { JwtPayload } from "jsonwebtoken";



export const getUserProfile = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.payload as JwtPayload;
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    return res.status(200).json({
      status: 'success',
      user
    });
  }
);