
import User from "../models/user.model";
import mongoose from "mongoose";

export const createUser = async (name:string, email: string, password:string) => {

    const newUser = await User.create({
        name: name,
        email: email,
        password: password
    });

    console.log(newUser)
    return "created succesfully"
}