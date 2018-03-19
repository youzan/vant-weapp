const path = require('path')
const getDemoTemplate = require('./website/demo')

module.exports = {
  async: false,
  config: path.resolve(__dirname, 'doc.config.js'),
  docs: [ path.resolve(__dirname, 'packages') ],
  out: path.resolve(__dirname, 'website/dist'),
  markdown: {
    before (source) {
      return getDemoTemplate.call(this, source)
    }
  },
  webpack: {
    output: {
      publicPath: process.argv[process.argv.length - 1] === 'build' ? 'https://b.yzcdn.cn/zanui/weapp' : '/',
      filename: '[name].[hash].js'
    }
  }
}
