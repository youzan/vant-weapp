require('./compiler');
const fs = require('fs-extra');
const path = require('path');
const serve = require('webpack-serve');
const config = require('./webpack.doc.dev');

fs.removeSync(path.join(__dirname, '../example/dist'));

serve({}, { config });
