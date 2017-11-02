const path = require('path');
const fs = require('fs-extra');
const nodeWatch = require('node-watch');
require('shelljs/global');

module.exports = function (config = {}) {
  // 清空 dist 目录
  fs.emptyDirSync(config.dist);

  extracter(config);

  if (config.watch) {
    nodeWatch(config.src, { recursive: true }, () => extracter(config));
  }
};


function extracter(config = {}) {
  // 复制 src
  fs.copySync(config.src, config.dist, {
    filter(src = '') {
      const extname = path.extname(src);
      return ['.pcss', '.md'].indexOf(extname) < 0;
    }
  });

  // js 无需编译，让微信开发者工具处理

  // 编译 wxss 文件
  exec(`gulp build --gulpfile scripts/utils/build-css.js --dist ${config.dist} --color`);
}
