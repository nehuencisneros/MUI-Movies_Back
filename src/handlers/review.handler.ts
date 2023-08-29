import { Response, Request } from "express";
import { createReview, getReviewsController } from "../controllers/review.controller";

export const newReview = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { reviewText, rating } = req.body;

    try {
        console.log(`el id es ${id}, el rating es ${rating} y la review es ${reviewText}`)
        // const results = await createReview(id, review, valuation)
        // res.status(200).json(results);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const allReviews =async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const response = await getReviewsController(+id)
        if (response.message) {
            return res.status(response.response.status).json({ error: response.response.data.status_message });
        }
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}