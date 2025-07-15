import nextPlugin from '@next/eslint-plugin-next';
import type { TSESLint } from '@typescript-eslint/utils';

const eslintNextConfig: TSESLint.FlatConfig.ConfigArray = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      // TypeError: context.getAncestors is not a function
      '@next/next/no-duplicate-head': 'off',
    },
  },
];

export default eslintNextConfig;
