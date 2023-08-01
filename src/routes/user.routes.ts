import { Router } from 'express';
import { loginUser, getUser } from '../handlers/user.handler';

const userRouter: Router = Router()

    userRouter.post("/login", loginUser)

    userRouter.get("/get/:id", getUser)

export default userRouter;