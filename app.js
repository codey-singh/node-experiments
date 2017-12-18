var express = require('express');

const PORT = process.env.PORT || 8080;

const DB = process.env.DB;

var app = express();

var mongoose = require('mongoose');

var db = mongoose.connect(DB, { useMongoClient: true });

var Book = require('./models/bookModel');

var router = express.Router();

router.get('/books',(request, response)=>{
  Book.find((err, books)=>{
    if(err)
      response.status(500).send(err);
    else {
      response.json(books);      
    }
  });
});

app.use("/api/v1", router) 

.listen(PORT, ()=>{
  console.log(`Gulp started express server on port ${ PORT }`);
});