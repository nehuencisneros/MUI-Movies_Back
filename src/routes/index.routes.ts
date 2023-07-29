import { Router } from "express";
import moviesRouter from "./movies.routes";
import reviewsRouter from "./review.routes";

const router = Router();

    router.use("/movies", moviesRouter);

    router.use("/reviews", reviewsRouter)

export default router;