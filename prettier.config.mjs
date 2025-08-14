import { fileURLToPath } from 'node:url';
// prettier.config.mjs
import { createJiti } from 'jiti';

const jiti = createJiti(fileURLToPath(import.meta.url));
const config = await jiti.import('./src/prettier.ts');

export default config.default;
