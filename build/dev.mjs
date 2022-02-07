import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { dev } from '@vant/cli';
import { exec } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const gulpConfig = resolve(__dirname, './compiler.js');

async function run() {
  await dev();

  const p = exec(`npx gulp -f ${gulpConfig} buildExample --color`);
  p.stdout.on('data', (stdout) => console.info(stdout));
  p.stderr.on('data', (stderr) => console.info(stderr));
}

run();
