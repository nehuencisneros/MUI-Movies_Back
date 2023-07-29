import 'dotenv/config';
import { getAllMovies, getAllPerson } from '../controllers/movies.controller';
import { Request, Response } from 'express';

export const getMovies = async (req: Request, res: Response) => {
    try{
        const data = await getAllMovies()
        res.status(200).json(data)
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

export const getPerson = async (req: Request, res: Response) => {
    try{
        const response = await getAllPerson()
        res
            .status(200)
            .json(response)
    } catch (error) {
        res
            .status(400).send({ error: error.message });
    }
}
