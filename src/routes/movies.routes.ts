import { Router } from 'express';
import { getPopularMovies, getAllMovies, getMovieById } from '../handlers/movies.handler';

const moviesRouter: Router = Router()

    moviesRouter.get("/", getAllMovies)

    moviesRouter.get("/:id", getMovieById)
    
    moviesRouter.get("/popular", getPopularMovies)

export default moviesRouter;