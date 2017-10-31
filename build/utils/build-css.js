const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssmin = require('gulp-clean-css');
const rename = require("gulp-rename");
const gutil = require('gulp-util');

const options = gutil.env;

gulp.task('compile', () => {
  return gulp.src('../../packages/**/*.pcss')
    .pipe(postcss())
    .pipe(cssmin())
    .pipe(rename(function (path) {
      path.extname = ".wxss"
    }))
    .pipe(gulp.dest(options.dist));
});

gulp.task('build', ['compile']);
