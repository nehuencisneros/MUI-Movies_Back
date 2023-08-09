import 'dotenv/config';
import Movie from "../models/movie.model";
import Review from "../models/review.model";
import axios from "axios";

const AUTHORIZATION = process.env.AUTHORIZATION;

export const createReview = async (id:string, review:string, valuation:number) => {
    // Obtener la película (Movie) por su ID
    const movie = await Movie.findById(id);
    if (!movie) {
        throw Error ("no se encontro la pelicula")
    }
        // Crear una nueva reseña (Review) asociada a la película
    const newReview = await Review.create({
        review: review,
        valuation: valuation,
    });

    // Agregar el ID de la nueva reseña a la referencia en el modelo Movie
    movie.reviewId.push(newReview._id);
    await movie.save();

    // Devolver la película con las reseñas asociadas
    const movieWithReviews = await Movie.findById(id).populate("reviewId");
    return movieWithReviews
}

export const getReviewsController = async () => {
    
    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/346698/reviews?language=en-US&page=1',
        headers: {
            accept: 'application/json',
            Authorization: AUTHORIZATION
        }
    };

    const response = await axios.request(options)
        .then(function (res:any){return res})
        .catch(function (err:any) {return (err)});

    const {data} = response
}


