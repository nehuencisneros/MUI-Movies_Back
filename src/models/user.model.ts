import mongoose, { Schema, Document }from "mongoose";

interface User extends Document {
    name:String;
    email: String;
    password: String;
}

const schema = new Schema<User>({
    name:{
        type: String, 
        required: true 
    },
    email:{
        type: String, 
        required: true 
    },
    password:{
        type: String, 
        required: true 
    }
});

export default mongoose.model<User>('User', schema);
