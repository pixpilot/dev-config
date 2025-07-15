import type { TSESLint } from '@typescript-eslint/utils';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

/**
 * ESLint configuration for React projects using TypeScript.
 *
 * This is a React-specific configuration intended to be used alongside other ESLint configs.
 *
 * Requirements:
 * - eslint-plugin-react
 * - eslint-plugin-react-hooks
 * - eslint-plugin-react-refresh
 *
 * This configuration provides:
 * - Recommended React and React Hooks rules for best practices
 * - React Refresh rules for HMR correctness (Vite/Next.js)
 * - Essential React rules for consistency and safety
 * - Automatic React version detection
 * - TypeScript-friendly settings (disables prop-types, jsx-runtime support)
 *
 * Formatting is intentionally excluded—use Prettier for code style.
 */
const config: TSESLint.FlatConfig.ConfigArray = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // Supports JS & TS React code
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2024,
        sourceType: 'module',
      },
      globals: {
        React: 'writable',
      },
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect installed React version
      },
    },
    rules: {
      // Recommended core rules
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      // Accessibility rules now come from jsxA11yConfig
      // React Refresh
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // TypeScript makes these redundant
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      // Essential React rules
      'react/jsx-key': 'error',
      'react/self-closing-comp': 'warn',
    },
  },
];

export default config;
