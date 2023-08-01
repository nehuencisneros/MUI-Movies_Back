import User from "../models/user.model";
import mongoose from "mongoose";

export const createUser = async (name:string, email: string, password:string) => {

    const newUser = await User.create({
        name: name,
        email: email,
        password: password
    });

    return "created succesfully"
}

export const findUser = async (id:mongoose.Types.ObjectId) => {

    const user = await User.findById(id).populate('reviews').exec();

    return user;
}