import type { TSESLint } from '@typescript-eslint/utils';

import baseConfig from './eslint';
import jestConfig from './eslint-jest';
import jsxA11yConfig from './eslint-jsx-a11y';
import nextConfig from './eslint-next';
import prettierConfig from './eslint-prettier';
import reactConfig from './eslint-react';

/**
 * Returns a complete ESLint config array for Next.js projects, including base, Jest, React, Next.js, JSX a11y, and Prettier configs.
 * Allows additional configs to be merged in via the `additionalConfigs` parameter.
 * @param additionalConfigs Optional extra ESLint config arrays to include.
 * @returns ESLint FlatConfig.ConfigArray for Next.js projects.
 */
export function createNextjsConfig(
  additionalConfigs: TSESLint.FlatConfig.ConfigArray = [],
): TSESLint.FlatConfig.ConfigArray {
  return [
    ...baseConfig,
    ...jestConfig,
    ...reactConfig,
    ...nextConfig,
    ...jsxA11yConfig,
    ...additionalConfigs, // User configs here
    ...prettierConfig, // Always last
  ];
}
