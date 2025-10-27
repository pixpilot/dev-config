import { defineConfig } from '@internal/tsdown-config';

const KB = 1024;
const LIMIT = 20;
const LIMIT_KB = LIMIT * KB;

export default defineConfig({
  minify: false,
  bundleSize: LIMIT_KB,
  entry: 'src/index.ts',
});
