const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssmin = require('gulp-clean-css');
const gutil = require('gulp-util');

const options = gutil.env;

gulp.task('compile', () => {
  return gulp.src('../../packages/**/*.wxss')
    .pipe(postcss())
    .pipe(cssmin())
    .pipe(gulp.dest(options.dist));
});

gulp.task('build', ['compile']);
