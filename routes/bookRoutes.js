var express = require('express');

var routes = (Book)=>{
  var bookRouter = express.Router();
  var bookController = require('../controllers/bookControllers')(Book);

  bookRouter.route('/')

  .get((request, response)=>{
    bookController.get(request, response);
  })

  .post((request, response)=>{
    bookController.post(request, response);
  });

  bookRouter.use('/:id', (request, response, next)=>{
    bookController.middleware(request, response, next);
  });

  bookRouter.route('/:id')  
  .get((request, response)=>{
    bookController.getOne(request, response);
  })
  .put((request, response)=>{
    bookController.put(request, response);
  })
  .patch((request, response)=>{
    bookController.patch(request, response);
  })
  .delete((request, response)=>{
    bookController.deleteOne(request, response);
  });
  return bookRouter;
}

module.exports = routes;