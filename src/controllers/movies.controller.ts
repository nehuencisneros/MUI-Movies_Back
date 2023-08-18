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
    backdrop_path: string;
    poster_path: string;
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
                backdrop_path: e.backdrop_path,
                poster_path: e.poster_path,
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
                    "backdrop_path": e.backdrop_path,
                    "poster_path": e.poster_path,
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


export const getSearchController = async ( searchValue: string ) => {
    
    const arrayMovies: Movie[] = []

    const byName = {
        url: `https://api.themoviedb.org/3/search/person?query=${searchValue}&include_adult=false&language=en-US&page=1`,
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: AUTHORIZATION
        }
    };

    const nameResponse = await axios.request(byName)
        .then(function (res:any){return res})
        .catch(function (err:any) {return (err)});

    const nameData = nameResponse.data

    await nameData.results.map((element:any) => {

        element.known_for.map((movie:any)=> {

            const dato:Movie = {
                id : movie.id,
                title: movie.title,
                overview: movie.overview ? movie.overview : "no overview",
                adult: movie.adult,
                lenguaje: movie.lenguaje,
                backdrop_path: movie.backdrop_path ?  "https://www.themoviedb.org/t/p/original" + movie.backdrop_path : "https://www.themoviedb.org/t/p/original" + movie.poster_path,
                poster_path: movie.poster_path,
                rating: movie.vote_average,
                release_date: movie.release_date,
            }

        !arrayMovies.find((e) => e.id === dato.id) && dato.title && arrayMovies.push(dato) 

        })
    })

    const byMovie = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=1`,
        headers: {
            accept: 'application/json',
            Authorization: AUTHORIZATION
        }
    };

    const movieResponse = await axios.request(byMovie)
        .then(function (res:any){return res})
        .catch(function (err:any) {return (err)});

    const movieData = movieResponse.data

    await movieData.results.map((movie:any)=> {
        const dato:Movie = {
            id : movie.id,
            title: movie.title,
            overview: movie.overview ? movie.overview : "no overview",
            adult: movie.adult,
            lenguaje: movie.lenguaje,
            backdrop_path: movie.backdrop_path ?  "https://www.themoviedb.org/t/p/original" + movie.backdrop_path : "https://www.themoviedb.org/t/p/original" + movie.poster_path,
            poster_path: movie.poster_path,
            rating: movie.vote_average,
            release_date: movie.release_date,
        }

        !arrayMovies.find(e => e.id === dato.id) && dato.title && arrayMovies.push(dato) 
    })

    return arrayMovies
}