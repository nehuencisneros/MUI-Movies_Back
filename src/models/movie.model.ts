import mongoose, { Schema, Document }from "mongoose";

export interface Movie extends Document {
    id: number;
    title: string;
    overview: string;
    // adult: boolean;
    // lenguaje: string;
    // image: string;
    // poster: string;
    // rating: number;
    // release_date: string;
}

const MovieSchema: Schema = new mongoose.Schema({
    id:{
        type: String, 
        required: true 
    },
    title:{
        type: String, 
        required: true 
    },
    overview: {
        type: String, 
        required: true 
    }
});

export default mongoose.model<Movie>('Movie', MovieSchema);

