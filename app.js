var express = require('express');

const PORT = process.env.PORT || 8080;

const DB = process.env.DB;

var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var db = mongoose.connect(DB, { useMongoClient: true });

var Book = require('./models/bookModel');

var router = express.Router();

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

router.get('/books',(request, response)=>{
  Book.find((err, books)=>{
    if(err)
      response.status(500).send(err);
    else {
      response.json(books);      
    }
  });
})

.post('/books', (request, response)=>{
  let book = new Book(request.body);
  book.save();
  response.status(201).send(book);
})

.get('/books/:id', (request, response)=>{
  Book.findOne({ _id : request.params.id }, (err, book)=>{
    if(err)
      response.status(500).send(err);
    else {
      response.json(book);      
    }
  });
});

app.use("/api/v1", router) 

.listen(PORT, ()=>{
  console.log(`Gulp started express server on port ${ PORT }`);
});