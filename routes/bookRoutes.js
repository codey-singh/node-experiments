var express = require('express');

var routes = (Book)=>{
  var bookRouter = express.Router();
  bookRouter.route('/')

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

  bookRouter.use('/:id', (request, response, next)=>{
    Book.findOne({ _id : request.params.id }, (err, book)=>{
      if(err)
        response.status(500).send(err);
      else{
        if(book) {
          request.book = book;
          next();      
        }
        else {
          response.status(404).send();
        }
      }
    });
  });

  bookRouter.route('/:id')  
  .get((request, response)=>{
    response.json(request.book);
  })
  .put((request, response)=>{
    request.book.title = request.body.title;
    request.book.author = request.body.author;
    request.book.genre = request.body.genre;
    request.book.read = request.body.read;
    request.book.save((error)=>{
      response.json(request.book);
    });
  })
  .patch((request, response)=>{
    if(request.book._id)
      delete request.book._id;
    for (const key of Object.keys(request.body)) {
      request.book[key] = request.body[key];
    }
    request.book.save((error)=>{
      response.json(request.book);
    });
  })
  .delete((request, response)=>{
    request.book.remove((error)=>{
      if(error)
        response.status(500).send(error);
      else 
        response.status(204).send("removed");
    });
  });
  return bookRouter;
}

module.exports = routes;