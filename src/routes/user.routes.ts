import { Router } from 'express';
import { addUser, getUser } from '../handlers/user.handler';

const userRouter: Router = Router()

    userRouter.post("/login", addUser)

    userRouter.get("/get/:id", getUser)

export default userRouter;