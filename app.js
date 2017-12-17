var express = require('express');

var app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (request, response)=>{
  response.send("Hi from express");
})

.listen(PORT, ()=>{
  console.log(`Gulp started express server on port ${ PORT }`);
});

