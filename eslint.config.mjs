import { createJiti } from 'jiti';
import { fileURLToPath } from 'url';

const jiti = createJiti(fileURLToPath(import.meta.url));
const { createNodejsEslintConfig } = await jiti.import(
  './src/create-nodejs-eslint-config',
);

const config = createNodejsEslintConfig();

export default config;
