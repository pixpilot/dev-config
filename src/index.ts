export * from './create-react-config';
export * from './create-nodejs-config';
export * from './create-nextjs-config';

// You can still export the raw configs if you want to give users that option
export { default as prettierConfig } from './prettier';
export { default as baseTsConfig } from './tsconfig-base.json';

// Export types if needed
export type { TSESLint, PrettierConfig, JestConfig } from './types/types.d';
