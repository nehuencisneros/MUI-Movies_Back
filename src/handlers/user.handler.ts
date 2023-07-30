import { Response, Request } from "express";

export const loginUser = async (req: Request, res: Response) => {

    try {
        res.status(200).json("estoy en la ruta")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}