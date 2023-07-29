import mongoose, { Schema, Document }from "mongoose";

interface Review extends Document {
    review: String;
    valuation: Number;
}

const schema = new Schema<Review>({
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
