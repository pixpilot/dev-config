import { createJiti } from 'jiti';
import { fileURLToPath } from 'url';

const jiti = createJiti(fileURLToPath(import.meta.url));
const config = await jiti.import('./src/eslint.ts');

export default [
  ...config.default,
  {
    ignores: [
      'tests/',
      'src/types/global.d.ts',
      'CHANGELOG.md',
      ...config.default[0].ignores,
    ],
  },
];
