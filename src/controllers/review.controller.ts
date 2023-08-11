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

export const getReviewsController = async (movieid: number) => {
    
    const arrayReviews: any = []
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
            .then(function (res:any){return res})
            .catch(function (err:any) {return (err)});

        const {data} = response
        
        data.results.map( (review:any) => {
            arrayReviews.push(review)
        })
    }

    return arrayReviews


}


// const datitos ={
// 	"id": 346698,
// 	"page": 1,
// 	"results": [
// 		{
// 			"author": "Chris Sawin",
// 			"author_details": {
// 				"name": "Chris Sawin",
// 				"username": "ChrisSawin",
// 				"rating": 7
// 			},
// 			"content": "_Barbie_ reels you in with its silly humor and fantastical ideas. The war of Kens during the last half hour of the film is an all-timer because a battle full of handsome maneuvers, like showing off their naked chest and manly noogies, turns into a full on dance off between Ryan Gosling and Simu Liu.\r\n\r\nBut the second half of the film leaves a thought-provoking message in your brain regarding both men and women. The Kens gaining respect little by little mirrors how women eventually earned their rights to be respected individuals — after being considered as only being useful in the kitchen or for making babies — except with the gender roles reversed and nude blobs instead of genitalia.\r\n\r\n**Full review:** https://bit.ly/beachoff",
// 			"created_at": "2023-07-21T22:04:12.071Z",
// 			"id": "64bb00dc357c00021de27485",
// 			"updated_at": "2023-07-21T22:04:12.156Z",
// 			"url": "https://www.themoviedb.org/review/64bb00dc357c00021de27485"
// 		},
// 		{
// 			"author": "MovieGuys",
// 			"author_details": {
// 				"name": "",
// 				"username": "MovieGuys",
// 				"rating": 1
// 			},
// 			"content": "I took my daughter along to see this, naively expecting light, family friendly fun and well, its not. Not even a little.\r\n\r\nThe kindest way I can describe this monstrosity is mean spirited, misandry. The message is simply not one I want my child taking on board.\r\n\r\nMy daughter wanted to leave before I'd even suggested it, so we did and had a better time doing something else together.\r\n\r\nIn summary, in my opinion, nasty and spiteful. Hollywood deserves its declining viewership, if this is all it has left to offer.",
// 			"created_at": "2023-07-24T07:46:36.727Z",
// 			"id": "64be2c5ce9da6900eceae0cc",
// 			"updated_at": "2023-07-24T21:38:21.998Z",
// 			"url": "https://www.themoviedb.org/review/64be2c5ce9da6900eceae0cc"
// 		},
// 		{
// 			"author": "Manuel São Bento",
// 			"author_details": {
// 				"name": "Manuel São Bento",
// 				"username": "msbreviews",
// 				"rating": 8
// 			},
// 			"content": "FULL SPOILER-FREE REVIEW @ https://www.firstshowing.net/2023/review-greta-gerwigs-barbie-is-both-hilarious-thought-provoking/\r\n\r\n\"Barbie is hilariously meta, containing spectacularly funny musical numbers, and an efficient tonal balance between over-the-top comedy and rich, thought-provoking social commentary. Inevitable awards are on the way for the brightly colored production design, costumes, and makeup.\r\n\r\nGreta Gerwig and Noah Baumbach's narrative unapologetically tackles quite serious topics, from sociopolitical matters like patriarchy and sexual harassment to questions about existential crises, personal identity, self-love, and, of course, the roles of women and men in today's society.\r\n\r\nMargot Robbie was destined to play Barbie just as Ryan Gosling was born with Kenergy in his veins. Absolutely fantastic, as are the rest of the Barbies and Kens.\r\n\r\nA must-see in a packed theater!\"\r\n\r\nRating: A-",
// 			"created_at": "2023-07-24T16:42:11.370Z",
// 			"id": "64bea9e3c51acd00af638e02",
// 			"updated_at": "2023-07-24T16:42:11.487Z",
// 			"url": "https://www.themoviedb.org/review/64bea9e3c51acd00af638e02"
// 		},
// 		{
// 			"author": "minymina",
// 			"author_details": {
// 				"name": "",
// 				"username": "minymina",
// 				"rating": 1
// 			},
// 			"content": "Terrible movie with no plot.\r\n\r\nThe film is marketed as a light hearted family film but instead focuses on adult themes while pushing an extremist feminist agenda which mocks traditional family values and men.\r\n\r\nThe only enjoyable parts of this movie are the scenes with Ken, played by Ryan Gosling.",
// 			"created_at": "2023-07-25T12:28:19.723Z",
// 			"id": "64bfbfe3b3316b011c701db1",
// 			"updated_at": "2023-07-25T12:28:19.809Z",
// 			"url": "https://www.themoviedb.org/review/64bfbfe3b3316b011c701db1"
// 		}
// ]
// }

