import { Router } from 'express';
import { signUp } from '../controllers/user.controller';


const authRouter = Router();

authRouter.route('/signup').post(signUp);

export default authRouter;