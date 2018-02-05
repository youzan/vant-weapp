const argv = require('yarns')
const path = require('path')
const shell = require('shelljs')
const file = require('./../build/file')
const buildDocConfig = require('./../build/doc')
const tplPath = path.resolve(__dirname, '../doc.config.js.tpl')
const websitePath = path.resolve(__dirname, '../')
const docsPath = path.resolve(__dirname, argv.docPath)
const configPath = path.join(process.cwd(), argv.config)
const outputPath = path.join(process.cwd(), argv.output || 'dist')

if (Object.hasPrototypeof(argv, 'init')) {
  shell.cp(tplPath, configPath)
}

if (!argv.config) return console.log('config 参数必须')
if (!file.hasFile(configPath)) return console.log(`找不到文件：${configPath}`)

if (Object.hasPrototypeof(argv, 'doc')) {
  buildDocConfig(docsPath, configPath)
}

if (Object.hasPrototypeof(argv, 'build')) {
  //
}
