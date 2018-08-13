require('./compiler');
const fs = require('fs-extra');
const path = require('path');
const glob = require('fast-glob');
const serve = require('webpack-serve');
const config = require('./webpack.doc.dev');
const tips = '// This file is auto gererated by build/build-entry.js';
const root = path.join(__dirname, '../');
const join = dir => path.join(root, dir);

// generate webpack entry file for markdown docs
function buildEntry() {
  const output = join('docs/src/docs-entry.js');

  const getName = fullPath =>
    fullPath
      .replace(/(\/README)|(\.md)/g, '')
      .split('/')
      .pop();

  const docs = glob
    .sync([
      join('docs/**/*.md'),
      join('packages/**/*.md'),
      '!**/node_modules/**'
    ])
    .map(fullPath => {
      const name = getName(fullPath);
      return `'${name}': () => import('${path.relative(
        join('docs/src'),
        fullPath
      )}')`;
    });

  const content = `${tips}
export default {
  ${docs.join(',\n  ')}
};
`;

  fs.writeFileSync(output, content);
}

buildEntry();
serve({}, { config });
