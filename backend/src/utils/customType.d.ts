// Jwt and User Type so my Request type doesnt throw a Type error

import { User } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

declare module 'express' {
  interface Request {
    user?: User;
    payload?: JwtPayload;
  }
}