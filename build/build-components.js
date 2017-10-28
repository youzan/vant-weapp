const fs = require('fs-extra');
const path = require('path');
require('shelljs/global');

const libDir = path.resolve(__dirname, '../dist');
const srcDir = path.resolve(__dirname, '../src');

// 清空 dist 目录
fs.emptyDirSync(libDir);

// 复制 src
fs.copySync(srcDir, libDir);

// js 无需编译，让微信开发者工具处理

// 编译 wxss 文件
exec('npm run css');
