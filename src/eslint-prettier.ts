import type { TSESLint } from '@typescript-eslint/utils';
import prettierConfig from 'eslint-config-prettier';

const eslintPrettier: TSESLint.FlatConfig.ConfigArray = [prettierConfig];

export default eslintPrettier;
