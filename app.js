var express = require('express');

const PORT = process.env.PORT || 8080;

const DB = process.env.DB;

var app = express();

var mongoose = require('mongoose');

var db = mongoose.connect(DB);

app.get("/", (request, response)=>{
  response.send("Hi from express");
})

.listen(PORT, ()=>{
  console.log(`Gulp started express server on port ${ PORT }`);
});