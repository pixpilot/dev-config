import type { TSESLint } from '@typescript-eslint/utils';

import baseConfig from './eslint';
import jestConfig from './eslint-jest';
import prettierConfig from './eslint-prettier';

/**
 * Returns a complete ESLint config array for Node.js projects, including base, Jest, and Prettier configs.
 * Allows additional configs to be merged in via the `additionalConfigs` parameter.
 * @param additionalConfigs Optional extra ESLint config arrays to include.
 * @returns ESLint FlatConfig.ConfigArray for Node.js projects.
 */
export function createNodejsConfig(
  additionalConfigs: TSESLint.FlatConfig.ConfigArray = [],
): TSESLint.FlatConfig.ConfigArray {
  return [
    ...baseConfig,
    ...jestConfig,
    ...additionalConfigs, // User configs here
    ...prettierConfig, // Always last
  ];
}
