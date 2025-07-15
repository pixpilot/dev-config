export * from './create-react-eslint-config';
export * from './create-nodejs-eslint-config';
export * from './create-nextjs-eslint-config';
export * from './utils/create-eslint-config';

// You can still export the raw configs if you want to give users that option
export { default as eslintConfig } from './eslint/base';
export { default as eslintJestConfig } from './eslint/jest';
export { default as prettierConfig } from './prettier';

// Export types if needed
export type { TSESLint, PrettierConfig, JestConfig } from './types/types';
