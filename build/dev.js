const fs = require('fs-extra');
const glob = require('fast-glob');
const path = require('path');
const tips = '// This file is auto gererated by build/build-entry.js';
const root = path.join(__dirname, '../');
const join = dir => path.join(root, dir);
const serve = require('webpack-serve');
const config = require('./webpack.dev');
const extracter = require('./extracter');

// generate webpack entry file for markdown docs
function buildDocsEntry() {
  const output = join('docs/src/docs-entry.js');
  const getName = fullPath => fullPath.replace(/(\/README)|(\.md)/g, '').split('/').pop();
  const docs = glob
    .sync([
      join('docs/**/*.md'),
      join('packages/**/*.md'),
      '!**/node_modules/**'
    ])
    .map(fullPath => {
      const name = getName(fullPath);
      return `'${name}': () => import('${path.relative(join('docs/src'), fullPath)}')`;
    });

  const content = `${tips}
export default {
  ${docs.join(',\n  ')}
};
`;
  fs.writeFileSync(output, content);
}

buildDocsEntry();

serve({}, { config });

extracter({
  src: path.resolve(__dirname, '../packages'),
  dist: path.resolve(__dirname, '../example/dist'),
  watch: true
});
