import mongoose, { Schema, Document }from "mongoose";

export interface User extends Document {
    nombre: string;
    telefono: number;
}

const UserSchema: Schema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true 
    },
    telefono: { type: 
        Number, required: 
        true 
    },
});

export default mongoose.model<User>('User', UserSchema);

