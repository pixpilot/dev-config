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
const configPath = path.resolve(__dirname, '../../packages/dev-config/src/prettier.ts');

const config = jiti(configPath);

export default config.default || config;
