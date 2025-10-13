import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '..', 'dist');
const indexFile = path.join(distDir, 'index.html');

if (!fs.existsSync(indexFile)) {
  console.error('index.html not found in dist. Make sure you run the build first.');
  process.exit(1);
}

const copies = ['200.html', '404.html'];
for (const name of copies) {
  const dest = path.join(distDir, name);
  try {
    fs.copyFileSync(indexFile, dest);
    console.log(`Wrote ${name}`);
  } catch (err) {
    console.error(`Failed to write ${name}:`, err);
    process.exitCode = 1;
  }
}

console.log('SPA fallback files written to dist (200.html, 404.html)');
