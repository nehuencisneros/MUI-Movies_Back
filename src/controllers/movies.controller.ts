import 'dotenv/config';
import Movie from '../models/movie.model';
import axios from 'axios';

const API_KEY = process.env.API_KEY;
const AUTHORIZATION = process.env.AUTHORIZATION;

export const getAllMovies = async () => {

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

export const getAllPerson = async () => {

    const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key='+ API_KEY )

    const  { data } = response

    return data;

}