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
const configPath = path.resolve(__dirname, '../../packages/rollup-config/src/config.ts');

const config = jiti(configPath);

// Re-export the config
export const { defineConfig } = config;
export default config.defineConfig;
