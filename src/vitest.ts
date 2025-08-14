import type { ViteUserConfig } from 'vitest/config';
import fastifyDeepmerge from '@fastify/deepmerge';
import ci from 'ci-info'; // Importing for type safety, not used directly
import { defineConfig } from 'vitest/config';

const deepmerge = fastifyDeepmerge({ all: true });

function makeConfig(userConfig: ViteUserConfig = {}): ViteUserConfig {
  const defaultConfig = defineConfig({
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
        enabled: ci.isCI,
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

  return deepmerge(defaultConfig, userConfig);
}

export default makeConfig;
