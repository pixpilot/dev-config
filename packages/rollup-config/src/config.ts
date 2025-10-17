import type { Plugin, RollupOptions } from 'rollup';
import type { RollupConfigOptions } from './types';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { globSync } from 'glob';
import copyPlugin from 'rollup-plugin-copy';
import { createWorkspaceAliases, resolveTsconfig } from './utils';

const outputDir = path.resolve(process.cwd(), 'dist');

interface PackageJson {
  name?: string;
  peerDependencies?: Record<string, string>;
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

  // Read package.json to get peerDependencies and package name
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  const packageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, 'utf-8'),
  ) as PackageJson;
  const peerDeps = Object.keys(packageJson.peerDependencies ?? {});

  // Create workspace aliases if bundleDependencies is enabled
  const workspaceAliases =
    bundleDependencies === true ? await createWorkspaceAliases(packageJson.name) : [];

  // Create alias plugin if there are workspace aliases
  const aliasPlugin: Plugin | null =
    workspaceAliases.length > 0
      ? (alias({ entries: workspaceAliases }) as unknown as Plugin)
      : null;

  // For all TypeScript files in 'src', excluding declaration files.
  let entryPoints;
  if (customEntryPoints != null) {
    entryPoints = customEntryPoints;
  } else if (options.multiEntry) {
    entryPoints = globSync('src/**/*.ts', {
      ignore: ['src/**/*.d.ts', 'src/**/__tests__/**'], // Ignore declaration files and all __tests__ folders
    });
  } else {
    entryPoints = 'src/index.ts';
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
      ...(aliasPlugin !== null ? [aliasPlugin] : []),

      typescript({
        tsconfig,
        /*
         * Enabling incremental compilation may cause errors and sometimes prevent .d.ts file generation.
         * It can also cause the creation of a .rollup.cache folder, which sometimes results in .d.ts files not being copied.
         */
        incremental: false,
      }),

      ...(minify ? [terser()] : []),

      /*
       * When bundling dependencies, we need both nodeResolve and commonjs plugins.
       * nodeResolve locates dependencies in node_modules.
       * commonjs converts CommonJS modules to ES6 so Rollup can bundle them.
       * The order matters: nodeResolve should come before commonjs.
       */
      ...(bundleDependencies === true ? [nodeResolve(), commonjs()] : []),
      ...(copy != null ? [copyPlugin(copy)] : []),
      ...(restOfOptions.plugins != null ? [restOfOptions.plugins].flat() : []),
    ],
  };

  return config;
}

export default defineConfig;
