/*
 * This config file exists to prevent the VS Code ESLint extension
 * from searching for an ESLint config in the root folder.
 */

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
const configPath = path.resolve(__dirname, './packages/dev-config/src/commitlint.ts');

const config = jiti(configPath);

export default config.default || config;
