import type { RollupOptions } from 'rollup';
import type { RollupConfigOptions } from './types';
import type { PackageJson } from './utils';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import alias from '@rollup/plugin-alias';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { globSync } from 'glob';
import copyPlugin from 'rollup-plugin-copy';
import { createWorkspaceAliases } from './utils';

const outputDir = path.resolve(process.cwd(), 'dist');

export async function defineConfig(
  options: RollupConfigOptions = {},
): Promise<RollupOptions> {
  const {
    multiEntry,
    bundleDependencies,
    minify = true,
    entryPoints: customEntryPoints,
    copy,
    ...restOfOptions
  } = options;

  // Read package.json to get dependencies and peerDependencies
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  const packageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, 'utf-8'),
  ) as PackageJson;
  const peerDeps = Object.keys(packageJson.peerDependencies ?? {});
  const deps = Object.keys(packageJson.dependencies ?? {});
  const allDeps = [...peerDeps, ...deps];

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

  // Get workspace aliases for bundling
  const workspaceAliases = bundleDependencies
    ? await createWorkspaceAliases(packageJson.name)
    : [];

  const config: RollupOptions = {
    input: entryPoints,
    external: bundleDependencies ? peerDeps : allDeps, // Only externals when not bundling
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
      // Add workspace aliases first when bundling
      // eslint-disable-next-line ts/no-unsafe-assignment, ts/no-unsafe-call
      ...(workspaceAliases.length > 0 ? [alias({ entries: workspaceAliases })] : []),

      typescript({
        tsconfig: './tsconfig.build.json',
        /*
         * Enabling incremental compilation may cause errors and sometimes prevent .d.ts file generation.
         * It can also cause the creation of a .rollup.cache folder, which sometimes results in .d.ts files not being copied.
         */
        incremental: false,
      }),

      ...(minify ? [terser()] : []),

      ...(bundleDependencies === true ? [nodeResolve()] : []),
      ...(copy != null ? [copyPlugin(copy)] : []),
      ...(restOfOptions.plugins != null ? [restOfOptions.plugins].flat() : []),
    ],
  };

  return config;
}

export default defineConfig;
