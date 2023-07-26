import 'dotenv/config'
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/users.routes';

const app = express();
const PORT = process.env.PORT

app.use(bodyParser.json())

app.use("/users", router);

const connectDB = async () => {
    try{
        mongoose.connect(process.env.DB_CONNECTION);
        console.log("MongoDB Connected");
    } catch (err){
        console.error(err.message);
        process.exit(1);
    }
}

// app.use(cors({
//     credentials: true,
// }))

// app.use(compression());
// app.use(cookieParser());


//const server = http.createServer(app);

app.listen(PORT, () => {
    connectDB()
    console.log("server running on ", PORT);
})