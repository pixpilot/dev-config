import type { TSESLint } from '@typescript-eslint/utils';

import prettierConfig from '../eslint/prettier';
import type { EslintConfigOptions } from '../types/common';

import { getIgnoreConfig } from './ignore-file-path';

/**
 * Merges ESLint config arrays, handling ignore file and Prettier placement.
 * @param configs Array of config arrays to merge (excluding ignore/prettier)
 * @param additionalConfigs Additional configs to merge
 * @param options Optional settings (ignoreFilePath)
 */
export function createEslintConfig(
  configs: TSESLint.FlatConfig.ConfigArray[],
  additionalConfigs: TSESLint.FlatConfig.ConfigArray = [],
  options?: EslintConfigOptions,
): TSESLint.FlatConfig.ConfigArray {
  const ignoreConfig = getIgnoreConfig(options);
  return [
    ...configs.flat(),
    ...additionalConfigs,
    ...(ignoreConfig ? [ignoreConfig] : []),
    ...prettierConfig,
  ];
}
