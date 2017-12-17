var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', ()=>{
  nodemon({
    script : 'app.js',
    ext : 'js',
    env : {
      PORT : 3000,
      DB : 'mongodb://localhost:27017/booksAPI'
    },
    ignore: ['./node_modules/**']
  })
  .on('restart', ()=> {
    console.log("Restarting...");
  })
});