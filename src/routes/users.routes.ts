import express from 'express';
import { postUser } from '../handlers/userHandler';

const router = express.Router()

    router.get("/", (req, res) => {
        res.send("hello world")
    })

    router.post("/", postUser)

export default router;