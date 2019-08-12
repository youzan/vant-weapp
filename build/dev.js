const path = require('path');
const serve = require('webpack-serve');
const config = require('./webpack.doc.dev');
const { exec } = require('child_process');

const gulpConfig = path.resolve(__dirname, './compiler.js');

serve({}, { config });

exec(`npx gulp -f ${gulpConfig} buildExample`);
