import fs from 'fs';
import path from 'path';

const pkg = JSON.parse(
  fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);

const assets = [];
for (const [_key, value] of Object.entries(pkg.exports)) {
  if (typeof value === 'string') {
    if (
      value.startsWith('./dist/') &&
      value.replace('./dist/', './src/').endsWith('.json')
    ) {
      assets.push([value.replace('./dist/', 'src/'), value.replace('./dist/', 'dist/')]);
    }
  }
}

assets.forEach(([src, dest]) => {
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  } else {
    console.warn('Warning: ' + src + ' does not exist, skipping copy.');
  }
});
