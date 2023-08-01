import mongoose, { Schema, Document }from "mongoose";

interface Movie extends Document {
    id: number;
    title: string;
    overview: string;
    adult: boolean;
    lenguaje: string;
    image: string;
    poster: string;
    rating: number;
    release_date: string;
    reviewId: mongoose.Types.ObjectId[];
}

const schema = new Schema<Movie>({
    id:{
        type: Number, 
        required: true 
    },
    title:{
        type: String, 
        required: true 
    },
    overview: {
        type: String, 
        required: true 
    },
    adult:{
        type: Boolean,
    },
    lenguaje:{
        type: String, 
    },
    image:{
        type: String, 
    },
    poster:{
        type: String, 
    },
    rating:{
        type: Number,
    },
    release_date:{
        type: String, 
    },
    reviewId: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Review' 
    }]
});

export default mongoose.model<Movie>('Movie', schema);

