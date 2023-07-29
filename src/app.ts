import express from 'express';
import bodyParser from "body-parser";
import cockieParser from "cookie-parser";
import cors from 'cors';
import compression from 'compression';
import router from './routes/index.routes';

const server = express();

    server.use(cors({ credentials: true }));
    server.use(compression());
    server.use(cockieParser());
    server.use(bodyParser.json())
    server.use('/', router)

export default server;