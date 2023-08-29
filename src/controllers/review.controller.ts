import 'dotenv/config';
import Review from "../models/review.model";
import axios from "axios";

const AUTHORIZATION = process.env.AUTHORIZATION;

export const createReview = async (id:number, review:string, valuation:number) => {

    await Review.create({
        idMovie: id,
        review: review,
        valuation: valuation,
    });
    
    return "created succesfully"
}

export const getReviewsController = async (movieid: number) => {
    const arrayReviews: any = []

    try {
        const reviewFromDatabase = await Review.find({ idMovie: movieid});
        if(reviewFromDatabase[0]){
            arrayReviews.push(reviewFromDatabase[0])
        }

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
