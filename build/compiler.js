const gulp = require('gulp');
const path = require('path');
const less = require('gulp-less');
const ts = require('gulp-typescript');
const insert = require('gulp-insert');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');

const tsConfig = path.resolve(__dirname, '../tsconfig.json');
const isProduction = process.env.NODE_ENV === 'production';
const src = path.join(__dirname, '../packages');
const libDir = path.resolve(__dirname, '../lib');
const esDir = path.resolve(__dirname, '../dist');
const exampleDir = path.resolve(__dirname, '../example/dist');

const libConfig = {
  target: 'es5',
  lib: ['es2015', 'es2017', 'dom'],
  module: 'commonjs',
  declaration: false
};

const compileLess = dist => () =>
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

const compileTs = (dist, config) => () => {
  const tsProject = ts.createProject(tsConfig, config);
  return tsProject
    .src()
    .pipe(tsProject())
    .on('error', () => {})
    .pipe(gulp.dest(dist));
};

const copy = (dist, ext) => () =>
  gulp.src(`${src}/**/*.${ext}`).pipe(gulp.dest(dist));

const compile = (dist, config) =>
  gulp.parallel(
    compileTs(dist, config),
    compileLess(dist),
    copy(dist, 'wxml'),
    copy(dist, 'wxs'),
    copy(dist, 'json')
  );

if (isProduction) {
  gulp.series(compile(esDir), compile(libDir, libConfig))();
} else {
  compile(exampleDir)();

  gulp.watch(`${src}/**/*.ts`, compileTs(exampleDir));
  gulp.watch(`${src}/**/*.less`, compileLess(exampleDir));
  gulp.watch(`${src}/**/*.wxml`, copy(exampleDir, 'wxml'));
  gulp.watch(`${src}/**/*.wxs`, copy(exampleDir, 'wxs'));
  gulp.watch(`${src}/**/*.json`, copy(exampleDir, 'json'));
}
