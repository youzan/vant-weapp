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

const lessCompiler = dist =>
  function compileLess() {
    return gulp
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
      .pipe(rename({ extname: '.wxss' }))
      .pipe(gulp.dest(dist));
  };

const tsCompiler = (dist, config) =>
  async function compileTs() {
    await exec(`npx tsc -p ${config}`);
    await exec(`npx tscpaths -p ${config} -s ../packages -o ${dist}`);
  };

const copier = (dist, ext) =>
  function copy() {
    return gulp.src(`${src}/**/*.${ext}`).pipe(gulp.dest(dist));
  };

const staticCopier = dist =>
  gulp.parallel(
    copier(dist, 'wxml'),
    copier(dist, 'wxs'),
    copier(dist, 'json')
  );

const cleaner = path =>
  function clean() {
    return exec(`npx rimraf ${path}`);
  };

const tasks = [
  ['buildEs', esDir, esConfig],
  ['buildLib', libDir, libConfig]
].reduce((prev, [name, ...args]) => {
  prev[name] = gulp.series(
    cleaner(...args),
    gulp.parallel(
      tsCompiler(...args),
      lessCompiler(...args),
      staticCopier(...args)
    )
  );
  return prev;
}, {});

tasks.buildExample = gulp.series(
  cleaner(exampleDir),
  gulp.parallel(
    tsCompiler(exampleDir, exampleConfig),
    lessCompiler(exampleDir),
    staticCopier(exampleDir),
    () =>
      gulp.src(`${icons}/**/*`).pipe(gulp.dest(`${exampleDir}/@vant/icons`)),
    () => {
      gulp.watch(`${src}/**/*.ts`, tsCompiler(exampleDir, exampleConfig));
      gulp.watch(`${src}/**/*.less`, lessCompiler(exampleDir));
      gulp.watch(`${src}/**/*.wxml`, copier(exampleDir, 'wxml'));
      gulp.watch(`${src}/**/*.wxs`, copier(exampleDir, 'wxs'));
      gulp.watch(`${src}/**/*.json`, copier(exampleDir, 'json'));
    }
  )
);

module.exports = tasks;
