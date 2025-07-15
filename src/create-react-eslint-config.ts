import type { TSESLint } from '@typescript-eslint/utils';

import baseConfig from './eslint/base';
import jestConfig from './eslint/jest';
import jsxA11yConfig from './eslint/jsx-a11y';
import reactConfig from './eslint/react';
import type { EslintConfigOptions } from './types/common';
import { createEslintConfig } from './utils/create-eslint-config';

/**
 * Returns a complete ESLint config array for React projects, including base, Jest, React, JSX a11y, and Prettier configs.
 * Allows additional configs to be merged in via the `additionalConfigs` parameter.
 * @param additionalConfigs Optional extra ESLint config arrays to include.
 * @returns ESLint FlatConfig.ConfigArray for React projects.
 */
export function createReactEslintConfig(
  additionalConfigs: TSESLint.FlatConfig.ConfigArray = [],
  options?: EslintConfigOptions,
): TSESLint.FlatConfig.ConfigArray {
  return createEslintConfig(
    [baseConfig, jestConfig, reactConfig, jsxA11yConfig],
    additionalConfigs,
    options,
  );
}
