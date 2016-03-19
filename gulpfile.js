var fs = require('fs');
// required to run gulp
var gulp = require('gulp'),

// Installs: -- Anytime the module won't work with a --save-dev gulp-, just "npm install gulp-"module-name"
// Use sudo for root admin to install modules only failed errors. "apparently you didn't install npm right if needed"

// npm install gulp-sass
// npm install --save-dev gulp-ruby-sass      <-- need to test if this is needed                      
// npm install --save-dev gulp-autoprefixer
// npm install --save-dev gulp-uglify
// npm install jshint gulp-jshint --save-dev
//npm install --save-dev jshint-stylish-ex    <-- try without stylish below which has no color option output
// npm install --save-dev jshint-stylish  
// npm install --save-dev gulp-livereload
// npm install --save-dev gulp-concat
// npm install --save-dev gulp-imagemin
// npm install gulp-cache
// npm install gulp-rename
// npm install express --save-dev             <-- For server!
// npm install gulp-notify                

//DONT FORGET your stylish reporter terminal color file: " .stylishcolors " containing the below uncommented.

/*{
    "meta": "gray",
    "reason": "blue",
    "verbose": "gray",
    "error": "red",
    "noproblem": "green"
}*/

// Gives notifications you can add
notify = require("gulp-notify"), //

// Autoprefixer
autoprefixer = require('gulp-autoprefixer'), 

// LiveReload of webpage / watching for file changes
livereload = require('gulp-livereload'), 

// Concatenates files
concat = require('gulp-concat'),

// Rename your output.js file to output.min.js
rename = require('gulp-rename'),

// JsHint javascript checker
jshint = require('gulp-jshint'),

// Minifies or beautifies output.js
uglify = require('gulp-uglify'),

// IMG compressor 
imagemin = require('gulp-imagemin'),

// Check to see if compressed already
cache = require('gulp-cache'),

// Sass
sass = require('gulp-sass'),
sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed' // Change css output styles: 'expanded', 'compressed'
};

/*var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(8081, function(){
  console.log('listening on *:8081');
});*/

gulp.task('express', function() {

  var app = require('express')();
  //var http = require('http').createServer(handler)
  var http = require('http').Server(app);
  var io = require('socket.io')(http);

  function handler (req, res) {

  var filePath = req.url;

  if (filePath == '/') {
      filePath = './index.html';
  } else {
      filePath = './final' + req.url;
  }

  var extname = path.extname(filePath);
  var contentType = 'text/html';

  switch (extname) {
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.css':
        contentType = 'text/css';
        break;
  }

  path.exists(filePath, function(exists) {

    if (exists) {
        fs.readFile(filePath, function(error, content) {
            if (error) {
                res.writeHead(500);
                res.end();
            }
            else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
    else {
        res.writeHead(404);
        res.end();
    }
  });
}

  app.use('/', function(req, res){
    /*res.set('Content-Type', "utf8");*/
    res.sendFile(__dirname + '/index.html');
  });

  io.emit('eventer', { for: 'everyone' });
    
  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
  });
});
    // function sets up server. Remove from gulp file, need this in its own js
    // Also sets ports and lets you connect with other devices.
    // Usefull in making an audio server! or something else. :D port 8081
  http.listen( 8081, function () {
  /*var host = server.address().address
  var port = server.address().port*/
  console.log('listening on *:8081');
  /*console.log("Example app listening at http://%s:%s", host, port)*/
})
});


/*gulp.task('express', function() {
  var express = require('express');
  var app = express();
  var io = require('socket.io')(http);
    app.use(express.static(__dirname));
    // function sets up server. Remove from gulp file, need this in its own js
    // Also sets ports and lets you connect with other devices.
    // Usefull in making an audio server! or something else. :D port 8081
  var server = app.listen( 8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
});*/

// Sass with autoprefixer embeded, so great.. piped to watch
gulp.task('sass', function() {
    return gulp.src('assets/sass/fish.scss') // My SCSS working files directory
      // Converts Sass to CSS with gulp-sass
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
        .pipe(gulp.dest('final/css'))
        .pipe(notify({ message: 'SASS, AutoPrefix executed' }));
});

// Returns source javascript file, does jshint, stylish-ex shows errors, file to change colors is limited. uglifies and outputs.
gulp.task('scripts', function() {
    return gulp.src('assets/js/fisher.js')
        .pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('jshint-stylish-ex')) // uses jshint-stylish-ex
        // Concat before uglify.
        .pipe(concat('fisher.js')) // output file name
        // Add gulp rename to make .js.min to show it's one line minified code.
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('final/js')) // Output for concat and .min suffix
        .pipe(uglify( {
          mangle: false,
          output: {
            beautify: false 
          }
        }))
        .pipe(gulp.dest('final/js')) // Output folder for ug/beautify
        .pipe(notify({ message: 'Scripts task complete' }));
});

// Livereload
gulp.task('livereload', function () {
    return gulp.src('final/css/fish.css') // Reading the css file output for reload
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('final/css'));
});

// Clear the cache files needs .jshintrc created in root of project.
gulp.task('clear', function (done) {
    return cache.clearAll(done);
});

gulp.task('images', function() {
    return gulp.src('assets/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('final/images'))
        .pipe(notify({ message: 'Images task complete' }));
});

// Watch, function
gulp.task('watch', function() {
    gulp.watch('assets/sass/**.scss', ['sass']);  // Sass watch.

    livereload.listen();             
// Add this script file before <body> in html document for live reload. 
// <script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');</script>

//save gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('assets/js/*.js', ['scripts']);

    gulp.watch('assets/images/**/*', ['images']); // Images watch for compress/cache changes

//save gulp.watch(['assets/css/**']).on('change', livereload.changed);
    gulp.watch(['assets/**']).on('change', livereload.changed); //livereload watching assets and folders within.
});

// AUTO tasks with gulp cacheclear or gulp default
// Clear cache then compress images. fixes a few things as well
gulp.task('cacheclear', ['clear', 'images'], function() {

});

// Runs all tasks/functions with: gulp default
gulp.task('default', ['express', 'sass', 'scripts', 'livereload', 'watch'], function() {
  
});