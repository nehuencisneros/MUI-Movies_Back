import mongoose, { Schema, Document }from "mongoose";

interface Review extends Document {
    idMovie: number;
    review: String;
    valuation: Number;
}

const schema = new Schema<Review>({
    idMovie:{
        type: Number, 
        required: true 
    },
    review:{
        type: String, 
        required: true 
    },
    valuation:{
        type: Number, 
        required: true 
    }
});

export default mongoose.model<Review>('Review', schema);
