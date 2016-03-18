var fs = require('fs');
// required to run gulp
var gulp = require('gulp'),

//installs
// sudo npm install --save-dev gulp-ruby-sass
// npm install gulp-sass                      <-- believe this is the method needed. --save-dev global bs
// npm install --save-dev gulp-autoprefixer
// npm install --save-dev gulp-uglify
// npm install --save-dev gulp-livereload
// npm install --save-dev gulp-concat
// npm install --save-dev gulp-imagemin
// npm install gulp-cache
// npm install express --save-dev             <-- Need this!
// npm install gulp-notify                    <-- remove --save-dev i think.

// npm install jshint gulp-jshint --save-dev
// npm install --save-dev jshint-stylish      <-- install stylish reporter for jshint

//DONT FORGET your stylish reporter terminal color file .stylishcolors

/*{
    "meta": "gray",
    "reason": "blue",
    "verbose": "gray",
    "error": "red",
    "noproblem": "green"
}*/

notify = require("gulp-notify"), //working on this to make it work..

// Autoprefixer vars
//var sourcemaps = require('gulp-sourcemaps'); // needed? idk
autoprefixer = require('gulp-autoprefixer'), // new, trying to work it
livereload = require('gulp-livereload'), // was commented out, revert to fix
// Concatination? didn't check into it yet, required by livereload
concat = require('gulp-concat'),

// JsHint javascript checker
jshint = require('gulp-jshint'),

uglify = require('gulp-uglify'),

// IMG compressor 
imagemin = require('gulp-imagemin'),
// Check to see if compressed already
cache = require('gulp-cache'),

// Sass vars
sass = require('gulp-sass'),
sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded' // Change css output styles: 'expanded', 'compressed'
};

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(express.static(__dirname));

  // function sets up server. Remove from gulp file, need this in its own js
  // Also sets ports and lets you connect with other devices.
  // Usefull in making an audio server! or something else. :D
  var server = app.listen( 8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
});

// Sass, so great.. piped to watch
gulp.task('sass', function() {
  return gulp.src('assets/sass/fish.scss') //change according to csss file output naming convention.
    // .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(autoprefixer('last 2 version'))
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(gulp.dest('assets/css'))
});

// Autoprefixer 
gulp.task('autoprefixer', function () {
    return gulp.src('assets/sass/fish.css') //change output
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('assets/css'));
});

// Scripts hint, not sure if working with sublime plugin.. testing in lint below
gulp.task('scripts', function() {
  // Set the source first.. output sky.js is minified.
  return gulp.src('assets/js/fisher.js')
    .pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('jshint-stylish-ex'))
    // Concat minifies my javascript and outputs it to sky.js, One line of code!
    .pipe(concat('skys.js'))
    .pipe(gulp.dest('assets/js'))
    // Add gulp rename to make .js.min to show it's one line minified code.
    //.pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Livereload
gulp.task('livereload', function () {
    return gulp.src('assets/css/fish.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('assets/css')); //doubled up information? ^ 
});

// Clear the cache files needs .jshintrc created in root of project.
gulp.task('clear', function (done) {
    return cache.clearAll(done);
});

gulp.task('images', function() {
    return gulp.src('assets/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('assets/images'))
        .pipe(notify({ message: 'Images task complete' }));
});

// Watch, function
gulp.task('watch', function() {
    gulp.watch('assets/sass/**.scss', ['sass']);  // Sass watch.

    livereload.listen();             
// Add this script file before <body> in html document for live reload. 
// <script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>

//save gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('assets/js/*.js', ['scripts']);

  gulp.watch('assets/images/**/*', ['images']); // Images watch for compress/cache plugin

//save gulp.watch(['assets/css/**']).on('change', livereload.changed);
  gulp.watch(['assets/**']).on('change', livereload.changed); //livereload watching css folder only.
  // Watch .js files //assuming these are watching javascript files, image files, for compression and js error correction
  
});

//**************AUTO tasks with gulp cacheclear or gulp default
// Clear cache then compress images.. fixes a few things as well.
gulp.task('cacheclear', ['clear', 'images'], function() {

});

// Runs all tasks/functions with: gulp default
gulp.task('default', ['express', 'sass', 'autoprefixer', 'scripts', 'livereload', 'watch'], function() {
  
});