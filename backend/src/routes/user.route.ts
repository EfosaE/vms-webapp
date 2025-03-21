import { Router } from 'express';
import { login, signUp } from '../controllers/auth.controller';



const authRouter = Router();

authRouter.route('/signup').post(signUp);
authRouter.route('/login').post(login);

export default authRouter;