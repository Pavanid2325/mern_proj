import express from 'express';
import {PORT,mongoDBURL} from './config.js';
import mongoose, { mongo } from 'mongoose';
import cors from 'cors';
import bookroutes from './routes/booksroutes.js';

const app = express();

app.use(express.json());

app.use(cors());

//app.use(cors({
//    origin: 'http://localhost:3000',
//    methods: ['GET', 'POST', 'PUT', 'DELETE'],
//    allowedHeaders: ['Content-Type'],
//}));

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('welcome!');
});

app.use('/books', bookroutes);

mongoose   
.connect(mongoDBURL)
.then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error)=> {
    console.log(error);
});

