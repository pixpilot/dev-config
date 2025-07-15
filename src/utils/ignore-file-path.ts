import { includeIgnoreFile } from '@eslint/compat';

import type { EslintConfigOptions } from '../types/common';

/**
 * Returns an ESLint ignore config if ignoreFilePath is provided, otherwise undefined.
 */
export function getIgnoreConfig(options?: EslintConfigOptions) {
  return options?.ignoreFilePath ? includeIgnoreFile(options.ignoreFilePath) : undefined;
}
