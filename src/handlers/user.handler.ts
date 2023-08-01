import { Response, Request } from "express";
import { createUser, findUser } from "../controllers/users.controller";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const addUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const response = await createUser(name, email, password)
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

