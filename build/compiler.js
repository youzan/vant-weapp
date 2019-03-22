const gulp = require('gulp');
const path = require('path');
const less = require('gulp-less');
const ts = require('gulp-typescript');
const insert = require('gulp-insert');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');

const tsProject = ts.createProject(path.resolve(__dirname, '../tsconfig.json'));
const isProduction = process.env.NODE_ENV === 'production';
const src = path.join(__dirname, '../packages');
const dist = path.join(__dirname, isProduction ? '../dist' : '../example/dist');

function copy(ext) {
  return gulp.src(`${src}/**/*.${ext}`).pipe(gulp.dest(dist));
}

function compileLess() {
  gulp
    .src(`${src}/**/*.less`)
    .pipe(less())
    .pipe(postcss())
    .pipe(
      insert.transform((contents, file) => {
        if (!file.path.includes('packages' + path.sep + 'common')) {
          contents = `@import '../common/index.wxss';` + contents;
        }
        return contents;
      })
    )
    .pipe(
      rename(path => {
        path.extname = '.wxss';
      })
    )
    .pipe(gulp.dest(dist));
}

function compileTs() {
  tsProject
    .src()
    .pipe(tsProject())
    .on('error', () => {})
    .pipe(gulp.dest(dist));
}

const compileWxml = () => copy('wxml');
const compileJson = () => copy('json');
const compileWxs = () => copy('wxs');

if (!isProduction) {
  gulp.watch('src/**/*.ts', compileTs);
  gulp.watch('src/**/*.less', compileLess);
  gulp.watch('src/**/*.wxml', compileWxml);
  gulp.watch('src/**/*.wxs', compileWxs);
  gulp.watch('src/**/*.json', compileJson);
}

gulp.parallel(compileTs, compileLess, compileWxml, compileJson, compileWxs)();
