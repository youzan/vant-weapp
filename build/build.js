const path = require('path');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssmin = require('gulp-clean-css');
const rename = require('gulp-rename');
const gutil = require('gulp-util');
const removeLogging = require('gulp-remove-logging');
const babel = require('gulp-babel');

const options = gutil.env;
const isProduction = process.env.NODE_ENV === 'production';

gulp.task('compile-css', () => {
  return gulp
    .src(['../packages/**/*.pcss', '!../packages/**/_*.pcss'])
    .pipe(postcss())
    .pipe(cssmin())
    .pipe(
      rename(path => {
        path.extname = '.wxss';
      })
    )
    .pipe(gulp.dest(options.dist));
});

gulp.task('compile-js', () => {
  return gulp
    .src(['../packages/**/*.js'])
    .pipe(
      removeLogging({
        methods: isProduction ? ['log', 'info'] : []
      })
    )
    .pipe(
      babel({
        extends: path.join(__dirname, '../.babelrc')
      })
    )
    .pipe(gulp.dest(options.dist));
});

gulp.task('build', ['compile-css', 'compile-js']);
