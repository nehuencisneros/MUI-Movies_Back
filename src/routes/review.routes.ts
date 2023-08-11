import { Router } from 'express';
import { newReview, allReviews} from '../handlers/review.handler';

const reviewsRouter: Router = Router()

    reviewsRouter.get("/:id", allReviews)

    reviewsRouter.post("/new/:id", newReview)

export default reviewsRouter;