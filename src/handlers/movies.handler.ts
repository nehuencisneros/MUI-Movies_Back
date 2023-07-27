import 'dotenv/config';
import { getAllMovies } from '../controllers/movies.controller';

export const getMovies = async (req: any, res: any) => {
    try{
        const data = await getAllMovies()
        res
            .status(200)
            .json(data)
    } catch (error) {
        res
            .status(400).send({ error: error.message });
    }
}
