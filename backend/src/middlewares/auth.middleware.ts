import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import { verifyToken } from '../services/auth.service';
import { JwtPayload } from 'jsonwebtoken';




export default catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Getting token and check of it's there
    let accessToken;
   
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      accessToken = req.headers.authorization.split(' ')[1];
    }

    console.log({accessToken});

    if (!accessToken) {
      return next(new AppError('please login to proceed', 401));
    }

    try {
      const decoded = await verifyToken(accessToken, `${process.env.JWT_SECRET}`);
      
      console.log(decoded)
      if (decoded && typeof decoded !== 'string') {
        req.payload = decoded as JwtPayload;
      }
      next();
    } catch (error) {
      if (error) {
        return next(new AppError('Login expired, please login again', 403));
      }
    }
  }
);