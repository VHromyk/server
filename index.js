import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import mongoose from "mongoose";
import dotenv from "dotenv"

import contactsRouter from './routes/api/contacts-router.js'

dotenv.config()

const {DB_HOST, PORT=5000} = process.env;

mongoose.connect(DB_HOST).then(()=> {
    app.listen(PORT, ()=> console.log(`Server is running on port: ${PORT}`))
}).catch((e)=> {
    console.log(e.message);
    process.exit(1)
})

export const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(cors())
app.use(logger(formatsLogger))
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res)=> {
    res.status(400).json({message: 'Not found!'})
})

app.use((err, req, res, next)=> {
    const {status = 500, message = 'Server error'} = err;
    res.status(status).json({message})
})

