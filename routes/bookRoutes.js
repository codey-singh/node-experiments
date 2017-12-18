var express = require('express');

var routes = (Book)=>{
  var bookRouter = express.Router();
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

  return bookRouter;
}

module.exports = routes;