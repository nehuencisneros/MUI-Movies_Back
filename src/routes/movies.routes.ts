import { Router } from 'express';
import { getMovies, getPerson } from '../handlers/movies.handler';

const moviesRouter: Router = Router()

    moviesRouter.get("/popular", getMovies)

    moviesRouter.get("/detail/", getPerson)

export default moviesRouter;