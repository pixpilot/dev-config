import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createJiti } from 'jiti';

// Get the directory of this file
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create jiti instance for runtime TypeScript compilation
const jiti = createJiti(__dirname, {
  interopDefault: true,
});

// Dynamically load and compile the TypeScript config
const configPath = path.resolve(__dirname, '../../packages/tsdown-config/src/config.ts');

const config = jiti(configPath);

const KB = 1024;
const LIMIT = 20;
const LIMIT_KB = LIMIT * KB;

/**
 * @param {import('../../packages/tsdown-config/src/config').Options} options
 */
export function defineConfig(options) {
  return config.defineConfig({
    minify: false,
    bundleSize: LIMIT_KB,
    sourcemap: true,
    ...options,
  });
}

export default defineConfig;
