import 'dotenv/config';
import { getPopularController, getAllController } from '../controllers/movies.controller';
import { Request, Response } from 'express';

export const getPopularMovies = async (req: Request, res: Response) => {
    try{
        const data = await getPopularController()
        res.status(200).json(data)
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

export const getAllMovies = async (req: Request, res: Response) => {
    try{
        const response = await getAllController()
        res
            .status(200)
            .json(response)
    } catch (error) {
        res
            .status(400).send({ error: error.message });
    }
}
