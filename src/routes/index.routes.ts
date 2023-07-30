import { Router } from "express";
import moviesRouter from "./movies.routes";
import reviewsRouter from "./review.routes";
import userRouter from "./user.routes";

const router = Router();

    router.use("/movies", moviesRouter);

    router.use("/reviews", reviewsRouter)

    router.use("/user", userRouter)

export default router;