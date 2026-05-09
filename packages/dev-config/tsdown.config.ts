import { defineConfig } from '@internal/tsdown-config';

const KB = 1024;
const LIMIT = 10;
const LIMIT_KB = LIMIT * KB;

export default defineConfig({
  minify: false,
  bundleSize: LIMIT_KB,
  entry: ['src/**/*.ts'],
  deps: { neverBundle: () => true },
  copy: [
    { from: 'src/tsconfig-base.json', to: 'dist' },
    { from: 'src/markdownlint.json', to: 'dist' },
  ],
});
