
var bookController = (Book)=>{
  var get = (request, response)=>{
    Book.find((err, books)=>{
      if(err)
        response.status(500).send(err);
      else {
        response.json(books);      
      }
    });
  };

  var post = (request, response)=>{
    let book = new Book(request.body);
    book.save();
    response.status(201).send(book);
  };

  var middleware = (request, response, next)=>{
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
  };

  var getOne = (request, response)=>{
    response.json(request.book);
  };

  var put = (request, response)=>{
    request.book.title = request.body.title;
    request.book.author = request.body.author;
    request.book.genre = request.body.genre;
    request.book.read = request.body.read;
    request.book.save((error)=>{
      response.json(request.book);
    });
  };

  var patch = (request, response)=>{
    if(request.book._id)
      delete request.book._id;
    for (const key of Object.keys(request.body)) {
      request.book[key] = request.body[key];
    }
    request.book.save((error)=>{
      response.json(request.book);
    });
  };

  var deleteOne = (request, response)=>{
    request.book.remove((error)=>{
      if(error)
        response.status(500).send(error);
      else 
        response.status(204).send("removed");
    });
  }

  return {
    get:get,
    post:post,
    middleware:middleware,
    getOne:getOne,
    put:put,
    patch:patch,
    deleteOne:deleteOne
  }
};


module.exports = bookController;