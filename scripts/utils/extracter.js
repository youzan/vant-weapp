const path = require('path');
const fs = require('fs-extra');
const nodeWatch = require('node-watch');
const debounce = require('lodash/debounce');
require('shelljs/global');

module.exports = function (config = {}) {
  // 清空 dist 目录
  fs.emptyDirSync(config.dist);

  extracter(config);

  if (config.watch) {
    nodeWatch(config.src, { recursive: true }, () => debouncedFunc(config));
  }
};

const debouncedFunc = debounce(config => extracter(config), 500);

function extracter(config = {}) {
  // 复制 src
  fs.copySync(config.src, config.dist, {
    filter(src = '') {
      const extname = path.extname(src);
      return ['.js', '.pcss', '.md'].indexOf(extname) < 0;
    }
  });

  // 编译 js wxss 文件
  exec(`gulp build --gulpfile scripts/utils/build.js --dist ${config.dist} --color`);
}
