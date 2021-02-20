const router = require('express').Router();
const axios = require('axios');
require('dotenv').config();

// @desc    Retrieve top books from selected lists
// @route   GET /book/bestsellers
// @access  Public
router.get('/bestsellers', async (req, res) => {
  const key = process.env.NYT_KEY;
  const { list } = req.query;
  // const keys = new Array(process.env.NYT_KEY1, process.env.NYT_KEY2, process.env.NYT_KEY3);

  // for (let i = 0; i < keys.length; i++) {
  try {
      const bestSeller = await axios.get(
        `https://api.nytimes.com/svc/books/v3/lists/current/${list}.json?&api-key=${key}`
      );

      res.json(bestSeller.data);
  } catch (err) {
    res.status(404).send(err);
  }
  // }
});

// @desc    Display 7 trending books
// @route   GET /book/trending
// @access  Public
router.get('/trending', async(req, res) => {
  const key = process.env.GOOGLE_KEY;
  const { isbn } = req.query;

  try {
    const book = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${key}`
    );
    // console.log('Google response: ', book)

    res.json(book.data);
  } catch (err) {
    res.status(404).send(err);
  }
});

const Book = require('../models/books');
// @desc    Display 7 trending books
// @route   GET /book/trending
// @access  Public
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(404).send(err);
  }
});

// @desc    Post a book to save in the database
// @route   POST /book
router.post('/', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedDoc = await newBook.save();

    res.status(201).send(savedDoc);
  } catch (err) {
    res.status(400).send(err);
  }
});

// @desc    Get one book's details
// @route   GET /book/details/:id
// @access  Public
router.get('/details/:isbn', async (req, res) => {
  let { isbn } = req.params;

  try {
    let first = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    console.log(first.data.items[0].id);
    let response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${first.data.items[0].id}`
    );
    res.send(response.data);
  } catch (error) {
    console.error(`Could not complete Google Books API request for isbn ${isbn}: `, error);
    res.status(400).send(error.message);
  }
});

// @desc    Get book of the month
// @route   GET /book/ofthemonth
// @access  Public
router.get('/ofthemonth/', (req, res) => {});

// @desc    Get book by bookname
// @route   GET /book/title/:title
// @access  Public
router.get('/title/:title', (req, res) => {});

module.exports = router;
