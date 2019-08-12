const gulp = require('gulp');
const path = require('path');
const less = require('gulp-less');
const insert = require('gulp-insert');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const src = path.resolve(__dirname, '../packages');
const icons = path.resolve(__dirname, '../node_modules/@vant/icons');

const libConfig = path.resolve(__dirname, '../tsconfig.lib.json');
const esConfig = path.resolve(__dirname, '../tsconfig.json');
const exampleConfig = path.resolve(__dirname, '../tsconfig.example.json');

const libDir = path.resolve(__dirname, '../lib');
const esDir = path.resolve(__dirname, '../dist');
const exampleDir = path.resolve(__dirname, '../example/dist');

const compileLess = dist => () =>
  gulp
    .src(`${src}/**/*.less`)
    .pipe(less())
    .pipe(postcss())
    .pipe(
      insert.transform((contents, file) => {
        if (!file.path.includes('packages' + path.sep + 'common')) {
          contents = `@import '../common/index.wxss';${contents}`;
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

const compileTs = (config, dest) => async () => {
  await exec(`npx tsc -p ${config}`);
  await exec(`npx tscpaths -p ${config} -s ../packages -o ../${dest}`);
};

const copy = (dist, ext) => () =>
  gulp.src(`${src}/**/*.${ext}`).pipe(gulp.dest(dist));

const copyStatic = dist =>
  gulp.parallel(copy(dist, 'wxml'), copy(dist, 'wxs'), copy(dist, 'json'));

const clean = path => () => exec(`npx rimraf ${path}`);

module.exports = {
  buildEs: gulp.series(
    clean(esDir),
    gulp.parallel(
      compileTs(esConfig, esDir),
      compileLess(esDir),
      copyStatic(esDir)
    )
  ),
  buildLib: gulp.series(
    clean(libDir),
    gulp.parallel(
      compileTs(libConfig, libDir),
      compileLess(libDir),
      copyStatic(libDir)
    )
  ),
  buildExample: gulp.series(
    clean(exampleDir),
    gulp.parallel(
      compileTs(exampleConfig, exampleDir),
      compileLess(exampleDir),
      copyStatic(exampleDir),
      () => gulp.src(`${icons}/**/*`).pipe(gulp.dest(`${exampleDir}/@vant/icons`)),
      () => {
        gulp.watch(`${src}/**/*.ts`, compileTs(exampleConfig, exampleDir));
        gulp.watch(`${src}/**/*.less`, compileLess(exampleDir));
        gulp.watch(`${src}/**/*.wxml`, copy(exampleDir, 'wxml'));
        gulp.watch(`${src}/**/*.wxs`, copy(exampleDir, 'wxs'));
        gulp.watch(`${src}/**/*.json`, copy(exampleDir, 'json'));
      }
    )
  )
};
