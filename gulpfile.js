var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('./scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

// Starts a test server, which you can view at http://localhost:8079
gulp.task('server', ['sass'], function() {
  gulp.src('./')
    .pipe($.webserver({
      port: 8079,
      host: 'localhost',
      fallback: 'index.html',
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['server'], function() {
  browserSync.init({
      server: "./"
  });
  gulp.watch(['./scss/**/*.scss','./scss/**/*.sass'], ['sass']);
  gulp.watch("./**/*.html").on('change', browserSync.reload);

});
