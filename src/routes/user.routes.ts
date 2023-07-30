import { Router } from 'express';
import { loginUser } from '../handlers/user.handler';

const userRouter: Router = Router()

    userRouter.post("/login", loginUser)

export default userRouter;