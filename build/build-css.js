const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssmin = require('gulp-clean-css');

gulp.task('compile', () => {
  return gulp.src('../packages/**/*.wxss')
    .pipe(postcss())
    .pipe(cssmin())
    .pipe(gulp.dest('../dist'));
});

gulp.task('build', ['compile']);
