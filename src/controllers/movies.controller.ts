import 'dotenv/config';
import movieModel, { Movie } from '../models/movie.model';

const axios = require('axios');
const { API_KEY } = process.env

export const getAllMovies = async () => {
    const response = await axios.get('https://api.themoviedb.org/3/movie/13?api_key=' + API_KEY )

    const  { data } = response

    const result = await movieModel.create({    
        id : data.id,
        title: data.title,
        overview: data. overview
    })
    return result;
}