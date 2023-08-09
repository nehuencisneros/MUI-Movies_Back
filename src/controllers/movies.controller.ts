import 'dotenv/config';
import Movie from '../models/movie.model';
import axios from 'axios';

const API_KEY = process.env.API_KEY;
const AUTHORIZATION = process.env.AUTHORIZATION;

type Movie = {
    id: number;
    title: string;
    overview: string;
    adult: boolean;
    lenguaje: string;
    image: string;
    poster: string;
    rating: number;
    release_date: string;
}

export const getPopularController = async () => {

    for(let i = 1; i <= 10; i++){
        let options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/popular?page=' + i,
            headers: {
                accept: 'application/json',
                Authorization: AUTHORIZATION
            }
        };

        const response = await axios.request(options)
                                .then(function (res:any){return res})
                                .catch(function (err:any) {return (err)});
        const {data} = response

        await data?.results.map( (e:any)=> {
            Movie.create({    
                id : e.id,
                title: e.title,
                overview: e.overview ? e.overview : "no overview",
                adult: e.adult,
                lenguaje: e.original_language,
                image: e.backdrop_path,
                poster: e.poster_path,
                rating: e.vote_average,
                release_date: e.release_date,
            }) 
        })
    }   

    return "succesfuly created";

}

export const getAllController = async () => {

    const arrayMovies: Movie[]= []
        
    for(let i = 1; i <= 5; i++){
        let options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/popular?page=' + i,
            headers: {
                accept: 'application/json',
                Authorization: AUTHORIZATION
            }
        };
    
        const response = await axios.request(options)
                                .then(function (res:any){return res})
                                .catch(function (err:any) {return (err)});
            
        if(response.data){
            const { data } = response

            await data?.results.map( (e:any)=> {
                arrayMovies.push({    
                    "id" : e.id,
                    "title": e.title,
                    "overview": e.overview ? e.overview : "no overview",
                    "adult": e.adult,
                    "lenguaje": e.original_language,
                    "image": e.backdrop_path,
                    "poster": e.poster_path,
                    "rating": e.vote_average,
                    "release_date": e.release_date,
                }) 
            })
        }
        }

    return arrayMovies;
}


export const getByIdController = async (id:number) => {

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/' + id,
        headers: {
            accept: 'application/json',
            Authorization: AUTHORIZATION
        }
    };

    const response = await axios.request(options)
        .then(function (res:any){return res})
        .catch(function (err:any) {return (err)});


    return response.data
}