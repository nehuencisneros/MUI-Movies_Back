import 'dotenv/config';
import Movie from "../models/movie.model";
import Review from "../models/review.model";
import axios from "axios";

const AUTHORIZATION = process.env.AUTHORIZATION;

export const createReview = async (id:string, review:string, valuation:number) => {

    const movie = await Movie.findById(id);
    if (!movie) {
        throw Error ("no se encontro la pelicula")
    }

    const newReview = await Review.create({
        review: review,
        valuation: valuation,
    });

    movie.reviewId.push(newReview._id);
    await movie.save();

    const movieWithReviews = await Movie.findById(id).populate("reviewId");
    return movieWithReviews
}

export const getReviewsController = async (movieid: number) => {
    const arrayReviews: any = []

    try {
        for( let i = 1; i < 3; i++){

            const options = {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/movie/'+ movieid +'/reviews?language=en-US&page='+ i,
                headers: {
                    accept: 'application/json',
                    Authorization: AUTHORIZATION
                }
            };

            const response = await axios.request(options)

            const {data} = response

            if(!data.message){
                data.results.map( (review:any) => {
                    arrayReviews.push(review)
                })
            }
            
        }
        return arrayReviews
    } catch (error) {
        return error
    }
}
