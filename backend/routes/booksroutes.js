import express from 'express';
import {Book} from '../models/bookmodel.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const {title, author, publishYear} = req.body;
    const book = new Book({
        title,
        author,
        publishYear
    });
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).json({message: 'Please fill all the fields'});
        }
        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        });
        const book = await newBook.save();
        return res.status(201).json(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: error.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count:books.length,
            books: books
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: error.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch (error) {  
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

router.put('/:id', async (req, res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).json({message: 'Please fill all the fields'});
        }

        const {id} = req.params;
        
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(404).json({message: 'Book not found'});
        }

        return res.status(200).json({
            message: 'Book updated successfully',
            book: result
        });
    } 
    catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message});

    }
});

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message: 'Book not found'});
        }   
        return res.status(200).json({
            message: 'Book deleted successfully',
            book: result
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }           
});

export default router;