import { Response, Request } from "express";
import { createUser } from "../controllers/users.controller";
import bcrypt from "bcrypt";

export const loginUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const response = await createUser(name, email, password)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}