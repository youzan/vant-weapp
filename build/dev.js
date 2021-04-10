const path = require('path');
const { dev } = require('@vant/cli');
const { exec } = require('child_process');

const gulpConfig = path.resolve(__dirname, './compiler.js');

async function run() {
  await dev();

  const p = exec(`npx gulp -f ${gulpConfig} buildExample --color`);
  p.stdout.on('data', (stdout) => console.info(stdout));
  p.stderr.on('data', (stderr) => console.info(stderr));
}

run();
