import { Response, Request } from "express";
import Movie from "../models/movie.model";
import Review from "../models/review.model";
import { createReview } from "../controllers/review.controller";
import mongoose from "mongoose";

export const newReview = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { review, valuation } = req.body;

    try {
        const results = await createReview(id, review, valuation)
        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};