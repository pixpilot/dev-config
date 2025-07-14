export * from './create-react-config';
export * from './create-nodejs-config';
export * from './create-nextjs-config';

// You can still export the raw configs if you want to give users that option
export { default as eslintConfig } from './eslint';
export { default as eslintJestConfig } from './eslint-jest';
export { default as prettierConfig } from './prettier';

// Export types if needed
export type { TSESLint, PrettierConfig, JestConfig } from './types/types.d';
