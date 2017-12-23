const postcssEasyImport = require('postcss-easy-import');
const precss = require('precss');
const postcssCalc = require('postcss-calc');

module.exports = {
  plugins: [
    postcssEasyImport({
      extensions: ['.wxss', '.css', '.pcss']
    }),
    precss(),
    postcssCalc()
  ]
};
