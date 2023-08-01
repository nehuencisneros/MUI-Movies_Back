import User from "../models/user.model";
import mongoose from "mongoose";
import bcrypt from "bcrypt"

export const createUser = async (name:string, email: string, password:string) => {

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    });

    return "created succesfully"
}

export const findUser = async (id:mongoose.Types.ObjectId) => {

    const user = await User.findById(id).populate('reviews').exec();

    return user;
}