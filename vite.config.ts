import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    target: 'node18',
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        eslint: resolve(__dirname, 'src/eslint.ts'),
        'eslint-jest': resolve(__dirname, 'src/eslint-jest.ts'),
        'eslint-jsx-a11y': resolve(__dirname, 'src/eslint-jsx-a11y.ts'),
        'eslint-next': resolve(__dirname, 'src/eslint-next.ts'),
        'eslint-prettier': resolve(__dirname, 'src/eslint-prettier.ts'),
        'eslint-react': resolve(__dirname, 'src/eslint-react.ts'),
        jest: resolve(__dirname, 'src/jest.ts'),
        prettier: resolve(__dirname, 'src/prettier.ts'),
        'create-nextjs-config': resolve(__dirname, 'src/create-nextjs-config.ts'),
        'create-nodejs-config': resolve(__dirname, 'src/create-nodejs-config.ts'),
        'create-react-config': resolve(__dirname, 'src/create-react-config.ts'),
      },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: [
        // External dependencies that shouldn't be bundled
        'eslint',
        'prettier',
        'typescript',
        'jest',
        'vite',
        '@eslint/js',
        '@eslint/compat',
        'typescript-eslint',
        'eslint-config-prettier',
        'eslint-plugin-import',
        'eslint-plugin-jest',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks',
        'eslint-plugin-react-refresh',
        '@next/eslint-plugin-next',
        'vite-plugin-dts',
        // Node.js built-ins
        'node:fs',
        'node:path',
        'node:process',
        'fs',
        'path',
        'process',
      ],
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [
    dts({
      outDir: 'dist',
      insertTypesEntry: true,
      copyDtsFiles: false,
      exclude: ['**/*.test.*', '**/*.spec.*'],
    }),
  ],
});
