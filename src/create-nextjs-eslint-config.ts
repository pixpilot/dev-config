import type { TSESLint } from '@typescript-eslint/utils';

import baseConfig from './eslint/base';
import jestConfig from './eslint/jest';
import jsxA11yConfig from './eslint/jsx-a11y';
import nextConfig from './eslint/nextjs';
import reactConfig from './eslint/react';
import type { EslintConfigOptions } from './types/common';
import { createEslintConfig } from './utils/create-eslint-config';

/**
 * Returns a complete ESLint config array for Next.js projects, including base, Jest, React, Next.js, JSX a11y, and Prettier configs.
 * Allows additional configs to be merged in via the `additionalConfigs` parameter.
 * @param additionalConfigs Optional extra ESLint config arrays to include.
 * @param options Optional settings to configure the ESLint setup.
 * @param options.ignoreFilePath Optional path to an ignore file to be included.
 * @returns ESLint FlatConfig.ConfigArray for Next.js projects.
 */
export function createNextjsEslintConfig(
  additionalConfigs: TSESLint.FlatConfig.ConfigArray = [],
  options?: EslintConfigOptions,
): TSESLint.FlatConfig.ConfigArray {
  return createEslintConfig(
    [baseConfig, jestConfig, reactConfig, nextConfig, jsxA11yConfig],
    additionalConfigs,
    options,
  );
}
