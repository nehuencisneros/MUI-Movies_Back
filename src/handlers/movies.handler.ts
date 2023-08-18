import 'dotenv/config';
import { getPopularController, getAllController, getByIdController, getSearchController } from '../controllers/movies.controller';
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
        res.status(400).send({ error: error.message });
    }
}

export const getMovieById =async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const response = await getByIdController(+id)
        res
            .status(200)
            .json(response)
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

export const getMovieSearch = async (req: Request, res: Response) => {
    const { searchValue } = req.params

    try {
        const response = await getSearchController(searchValue)
        res
            .status(200)
            .json(response)
    } catch (error) {
        res.status(400).send({ error: error.message})
    }
}