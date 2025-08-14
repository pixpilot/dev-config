import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    watch: false,
    globals: true,
    environment: 'node',
    include: [
      '**/*.test.ts',
      'test/**/*.test.ts',
      '__tests__/**/*.test.ts',
      '**/*.spec.ts',
      'test/**/*.spec.ts',
      '__tests__/**/*.spec.ts',
      '**/*.test.tsx',
      'test/**/*.test.tsx',
      '__tests__/**/*.test.tsx',
      '**/*.spec.tsx',
      'test/**/*.spec.tsx',
      '__tests__/**/*.spec.tsx',
    ],
    exclude: ['**/node_modules/**', '**/dist/**'],
    coverage: {
      enabled: true,
      provider: 'v8',
      reportOnFailure: true,
      reporter: ['text-summary', 'json', 'html'],
      include: [
        'packages/*/src/**/*.ts',
        'packages/*/src/**/*.tsx',
        'src/**/*.ts',
        'src/**/*.tsx',
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
