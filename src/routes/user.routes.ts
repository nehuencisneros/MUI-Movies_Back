import { Router } from 'express';
import { newUser, getUser, login } from '../handlers/user.handler';

const userRouter: Router = Router()

    userRouter.post("/new", newUser)

    userRouter.post("/login", login)

    userRouter.get("/get/:id", getUser)

export default userRouter;