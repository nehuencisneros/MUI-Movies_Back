import { Router } from 'express';
import { getPopularMovies, getAllMovies } from '../handlers/movies.handler';

const moviesRouter: Router = Router()

    moviesRouter.get("/", getAllMovies)

    moviesRouter.get("/popular", getPopularMovies)

export default moviesRouter;