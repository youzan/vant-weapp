const fs = require('fs-extra');
const nodeWatch = require('node-watch');
require('shelljs/global');

module.exports = function (config = {}) {
  // 清空 dist 目录
  fs.emptyDirSync(config.dist);

  if (config.watch) {
    extracter(config);
    nodeWatch(config.src, { recursive: true }, () => extracter(config));
  } else {
    extracter(config);
  }
};


function extracter(config = {}) {
  // 复制 src
  fs.copySync(config.src, config.dist);

  // js 无需编译，让微信开发者工具处理

  // 编译 wxss 文件
  exec('npm run css');
}
