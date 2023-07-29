import { Router } from 'express';
import { newReview } from '../handlers/review.handler';

const reviewsRouter: Router = Router()

    reviewsRouter.post("/new/:id", newReview)

export default reviewsRouter;