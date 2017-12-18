var express = require('express');

const PORT = process.env.PORT || 8080;

const DB = process.env.DB;

var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var db = mongoose.connect(DB, { useMongoClient: true });

var Book = require('./models/bookModel');

var bookRouter = require('./routes/bookRoutes')(Book);

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.use("/api/v1", bookRouter) 

.listen(PORT, ()=>{
  console.log(`Gulp started express server on port ${ PORT }`);
});