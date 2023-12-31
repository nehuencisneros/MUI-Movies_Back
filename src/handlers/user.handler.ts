import { Response, Request } from "express";
import { newUserController, findUser, loginUser } from "../controllers/users.controller";
import mongoose from "mongoose";

export const newUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const response = await newUserController(name, email, password)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const response = await loginUser( email, password)

        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const objId = new mongoose.Types.ObjectId(id);
        const userFind = await findUser (objId)

        res.status(200).send(userFind)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

