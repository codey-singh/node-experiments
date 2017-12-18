var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bookModel = new Schema({
  author : { type : String },
  title :  { type : String },
  genre :  { type : String },
  read :  { type : Boolean, default : false }
});

module.exports = mongoose.model('Book', bookModel);