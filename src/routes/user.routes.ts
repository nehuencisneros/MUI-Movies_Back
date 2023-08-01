import { Router } from 'express';
import { addUser, getUser, login } from '../handlers/user.handler';

const userRouter: Router = Router()

    userRouter.post("/new", addUser)

    userRouter.post("/login", login)

    userRouter.get("/get/:id", getUser)

export default userRouter;