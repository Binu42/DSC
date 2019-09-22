require('dotenv').config();
// Dependencies
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json({extended: false}));

// Connecting to Database
const db = require('./config/database');
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(function () {
    console.log('successfully connected to database');
}).catch((err) => console.log(err));

// Book Schema
require('./models/Book');
const Book = mongoose.model('books');

// route to get all books in database
app.get('/getbooks', async(req, res) => {
    try{
        const books = await Book.find();
        res.json(books);
    }catch(error){
        console.error(error.message);
        res.status(500).send('server Error');
    }
})

// route to save all posted books into database
app.post('/addbooks', async(req, res) => {
    try {
        const newBook = new Book({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        })
        const post = await newBook.save();
        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server Error');
    }
})

const port = process.env.PORT || 5000
app.listen(port, (req, res) => {
    console.log(`server is running at port ${port}`);
})