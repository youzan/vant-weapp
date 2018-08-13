require('./compiler');
const serve = require('webpack-serve');
const config = require('./webpack.doc.dev');

serve({}, { config });
