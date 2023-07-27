import express from 'express';
import { getMovies } from '../handlers/movies.handler';

const router = express.Router()

    router.get("/movie", getMovies)

export default router;