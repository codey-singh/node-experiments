var express = require('express');
var bookRouter = express.Router();
var Book = require('../models/bookModel');

bookRouter.route('/books')

.get((request, response)=>{
  Book.find((err, books)=>{
    if(err)
      response.status(500).send(err);
    else {
      response.json(books);      
    }
  });
})

.post((request, response)=>{
  let book = new Book(request.body);
  book.save();
  response.status(201).send(book);
});

bookRouter.route('/books/:id')
.get((request, response)=>{
  Book.findOne({ _id : request.params.id }, (err, book)=>{
    if(err)
      response.status(500).send(err);
    else {
      response.json(book);      
    }
  });
});

module.exports = bookRouter;