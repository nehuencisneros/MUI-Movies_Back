import User from "../models/user.model";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config';

const SECRET_KEY = process.env.SECRET_KEY

export const createUser = async (name:string, email: string, password:string) => {

    const hashedPassword:string = await bcrypt.hash(password, 10)

    const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    });

    return "created succesfully"
}


export const loginUser = async ( email: string, password:string) => {
    
    const userRepeat = await User.find({ email: email })

    if(!userRepeat){
        throw new Error("no existe ese usuario")
    }
    
    const userPassword = userRepeat[0].password.toString()

    const response = await bcrypt.compare(password, userPassword)

    if(response ){
        const token = jwt.sign({
            email: email
        }, SECRET_KEY)
        return token
    }else {
        return "la contraseña no es correcta"
    }
}   




export const findUser = async (id:mongoose.Types.ObjectId) => {

    const user = await User.findById(id).populate('reviews').exec();

    return user;
}