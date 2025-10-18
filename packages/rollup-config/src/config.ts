import type { Plugin, RollupOptions } from 'rollup';
import type { RollupConfigOptions } from './types';
import { execSync } from 'node:child_process';

import path from 'node:path';
import process from 'node:process';

import { getExternalPackages } from '@internal/utils';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import copyPlugin from 'rollup-plugin-copy';

import { resolveTsconfig } from './utils';

import { resolveEntryPoints } from './utils/resolve-entry-points';

const outputDir = path.resolve(process.cwd(), 'dist');

/**
 * Plugin to generate TypeScript declarations after bundling
 * This runs tsc separately to generate .d.ts files only for the current package
 */
function generateDeclarations(tsconfig: string): Plugin {
  return {
    name: 'generate-declarations',
    writeBundle() {
      try {
        // Run tsc to generate declarations
        execSync(
          `npx tsc --project ${tsconfig} --emitDeclarationOnly --declarationDir dist`,
          {
            stdio: 'inherit',
            cwd: process.cwd(),
          },
        );
      } catch (error) {
        console.warn('Failed to generate declarations:', error);
      }
    },
  };
}

export async function defineConfig(
  options: RollupConfigOptions = {},
): Promise<RollupOptions> {
  const {
    multiEntry,
    bundleDependencies,
    minify = true,
    entryPoints: customEntryPoints,
    copy,
    tsconfig: customTsconfig,
    ...restOfOptions
  } = options;

  // Determine tsconfig path
  const tsconfig = resolveTsconfig(customTsconfig);

  const peerDeps = getExternalPackages(process.cwd());

  // Create workspace aliases if bundleDependencies is enabled

  // For all TypeScript files in 'src', excluding declaration files.
  let entryPoints: string | string[];
  if (options.multiEntry) {
    const optionsForResolve =
      customEntryPoints !== undefined ? { entry: customEntryPoints } : undefined;
    entryPoints = resolveEntryPoints(optionsForResolve);
  } else {
    entryPoints = customEntryPoints ?? 'src/index.ts';
  }

  const config: RollupOptions = {
    input: entryPoints,
    external: peerDeps,
    ...restOfOptions,
    output: [
      {
        dir: outputDir,
        entryFileNames: '[name].cjs',
        format: 'cjs',
        exports: 'named',
        // Preserve the original module structure.
        preserveModules: !bundleDependencies,
        // Set 'src' as the root. This strips 'src/' from the output path.
        // e.g., 'src/configs/main.ts' becomes 'dist/configs/main.cjs'
        preserveModulesRoot: 'src',
      },
      {
        dir: outputDir,
        entryFileNames: '[name].js',
        format: 'es',
        preserveModules: !bundleDependencies,
        preserveModulesRoot: 'src',
      },
      ...(restOfOptions.output ? [restOfOptions.output].flat() : []),
    ],
    plugins: [
      // Add alias plugin first to resolve workspace packages from their built versions
      // ...(aliasPlugin !== null ? [aliasPlugin] : []),

      // TypeScript plugin must come first to transpile TS files before other plugins process them
      typescript({
        tsconfig,
        /*
         * Enabling incremental compilation may cause errors and sometimes prevent .d.ts file generation.
         * It can also cause the creation of a .rollup.cache folder, which sometimes results in .d.ts files not being copied.
         */
        incremental: false,
        // When bundling dependencies, we need to handle declaration generation carefully
        ...(bundleDependencies === true
          ? {
              include: ['**/*.ts'],
              exclude: ['node_modules/**', '**/*.d.ts'],
              compilerOptions: {
                declaration: false, // Disable inline declaration generation
              },
            }
          : {}),
      }),

      ...(minify ? [terser()] : []),

      /*
       * When bundling dependencies, we need both nodeResolve and commonjs plugins.
       * nodeResolve locates dependencies in node_modules.
       * commonjs converts CommonJS modules to ES6 so Rollup can bundle them.
       * The order matters: nodeResolve should come before commonjs.
       */
      ...(bundleDependencies === true
        ? [
            nodeResolve({
              extensions: ['.ts', '.js', '.mjs', '.json', '.node'],
            }),
            commonjs(),
          ]
        : []),
      ...(copy != null ? [copyPlugin(copy)] : []),
      ...(restOfOptions.plugins != null ? [restOfOptions.plugins].flat() : []),
      // Generate declarations after bundling
      ...(bundleDependencies === true ? [generateDeclarations(tsconfig)] : []),
    ],
  };

  return config;
}

export default defineConfig;
