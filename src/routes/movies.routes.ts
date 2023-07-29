import express from 'express';
import { getMovies, getPerson } from '../handlers/movies.handler';

const router = express.Router()

    router.get("/popularMovies", getMovies)

    router.get("/movie/person", getPerson)

export default router;