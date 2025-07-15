import type { TSESLint } from '@typescript-eslint/utils';
import jsxA11y from 'eslint-plugin-jsx-a11y';

/**
 * ESLint accessibility rules via eslint-plugin-jsx-a11y.
 * Intended for reuse in React/JS/TS configs.
 *
 * Requirements:
 * - eslint-plugin-jsx-a11y
 */
const jsxA11yConfig: TSESLint.FlatConfig.ConfigArray = [
  {
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...jsxA11y.configs.recommended.rules,
    },
  },
];

export default jsxA11yConfig;
