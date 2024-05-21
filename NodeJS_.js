const express = require('express');
const app = express();
app.use(express.json());

let books = [];

// Get all books
app.get('/books', (req, res) => {
  res.status(200).json(books);
});

// Get a book by slug:id
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Add a new book to books
app.post('/books', (req, res) => {
	const { id, title, author, published_date, price } = req.body;
	
	// CHecking missing fields in req
	if (!id || !title || !author || !published_date || !price) {
	  return res.status(400).json({ message: 'Missing required fields' });
	}
	// Checkin data types in req
	if (typeof id !== 'number' || typeof title !== 'string' || typeof author !== 'string' || isNaN(Date.parse(published_date)) || typeof price !== 'number') {
	  return res.status(400).json({ message: 'Invalid data types' });
	}
	// Checking for duplicate ID in books
	const existingBook = books.find(b => b.id === id);
	if (existingBook) {
	  return res.status(409).json({ message: 'Book with this ID already exists' });
	}
	const book = { id, title, author, published_date, price };
	books.push(book);
	res.status(201).json(book);
  });

// Update a book by slug:id
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) {
    const { title, author, published_date, price } = req.body;
    book.title = title;
    book.author = author;
    book.published_date = published_date;
    book.price = price;
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Delete a book by slug:id
app.delete('/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index !== -1) {
    books.splice(index, 1);
    res.status(200).json({ message: 'Book deleted successfully' });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

module.exports = app;
