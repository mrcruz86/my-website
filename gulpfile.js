// ////////////////////////////////////////////////
// Require
// // /////////////////////////////////////////////

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync'),
	reload = browserSync.reload,
  nodemon = require('gulp-nodemon');

// ////////////////////////////////////////////////
// Log Errors
// // /////////////////////////////////////////////

function errorlog(err) {
  console.log(err.message);
  this.emit('end');
}

// ////////////////////////////////////////////////
// HTML Tasks
// // /////////////////////////////////////////////

gulp.task('html', function(cb){
    return gulp.src('public/**/*.html')
    	.pipe(reload({stream:true}));
});

// ////////////////////////////////////////////////
// Style Tasks
// // /////////////////////////////////////////////

gulp.task('styles', function(cb) {
  return gulp.src('sass/style.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths,
      outputStyle: 'compressed'
    }))
    .on('error', errorlog)
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('../../maps'))
    .pipe(gulp.dest('public/styles'))
    .pipe(reload({
      stream: true
    }));
});

// ////////////////////////////////////////////////
// Nodemon Tasks
// // /////////////////////////////////////////////

gulp.task('nodemon', ['html', 'styles'], function(cb) {
  var started = false;

  return nodemon({
    script: 'app.js'
  }).on('start', function() {
    // to avoid nodemon being started multiple times
    if (!started) {
      cb();
      started = true;
    }
  });
});

// ////////////////////////////////////////////////
// Browser Sync Tasks
// // /////////////////////////////////////////////

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init({
        proxy: "http://localhost:3000",
				port: 3001,
				socket: {
					domain: 'localhost:3001'
				}
    });
});

// ////////////////////////////////////////////////
// Watch Tasks
// // /////////////////////////////////////////////

gulp.task('watch', function() {
  gulp.watch('sass/**', ['styles']);
  gulp.watch('public/**/*.html', ['html']);
});

// ////////////////////////////////////////////////
// Default Tasks
// // /////////////////////////////////////////////

gulp.task('default', ['html', 'styles', 'browser-sync', 'watch']);
