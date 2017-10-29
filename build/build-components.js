const path = require('path');
const extracter = require('./utils/extracter');

extracter({
  src: path.resolve(__dirname, '../packages'),
  dist: path.resolve(__dirname, '../dist')
});
