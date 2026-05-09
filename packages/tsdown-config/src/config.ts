import type { SizeLimitOption } from '@pixpilot/rollup-plugin-size-limit';

import type { UserConfig as TsDownOptions } from 'tsdown';
import process from 'node:process';

import { getExternalPackages, getPrivateWorkspacePackages } from '@internal/utils';
import { sizeLimit } from '@pixpilot/rollup-plugin-size-limit';

export interface Options extends TsDownOptions {
  /** Whether to include external dependencies in the final bundle. */
  bundleDependencies?: boolean;
  /**
   * Check the size of the final bundle files.
   * - `number`: Maximum size in bytes (throws error if exceeded)
   * - `object`: Configuration with maxSize and throwError options
   * - `boolean`: Enable/disable size checking (must provide maxSize if true)
   * @example
   * ```ts
   * // Throw error if any file exceeds 1MB
   * bundleSize: 1024 * 1024
   *
   * // Just warn, don't throw error
   * bundleSize: { maxSize: 1024 * 1024, throwError: false }
   * ```
   */
  bundleSize?: SizeLimitOption;
}

function defineConfig(options?: Options): Options {
  const { bundleDependencies, bundleSize } = options || {};

  const tsdownOptions: Options = {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    treeshake: true,
    clean: true,
    minify: true,
    /*
     * Use .js/.d.ts for ESM and .cjs/.d.cts for CJS so consumers with
     * both `moduleResolution: bundler` and `node16/nodenext` can resolve
     * types without extra exports map tricks.
     * Note: tsdown normalizes 'esm' → 'es' internally (rolldown convention).
     */
    outExtensions: ({ format }) => {
      if (format === 'es') return { js: '.js', dts: '.d.ts' };
      return { js: '.cjs', dts: '.d.cts' };
    },
  };

  /*
   * Only configure deps externalization when the user has not supplied their
   * own `deps` or the legacy `external`/`noExternal` overrides. This avoids
   * tsdown throwing on conflicting deprecated/new API combinations.
   */
  const userHasExternalConfig =
    options?.deps != null || options?.external != null || options?.noExternal != null;

  if (!userHasExternalConfig) {
    if (bundleDependencies) {
      tsdownOptions.deps = { alwaysBundle: [/.*/u] };
    } else {
      const externalPackages = getExternalPackages(process.cwd());
      const privatePackages = getPrivateWorkspacePackages(process.cwd());

      tsdownOptions.deps = {
        neverBundle: (id: string) => {
          if (externalPackages.includes(id)) return true;
          if (id.startsWith('node:')) return true;
          return false;
        },
        ...(privatePackages.length > 0 && {
          alwaysBundle: privatePackages.map(
            (pkg: string) =>
              new RegExp(`^${pkg.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')}$`, 'u'),
          ),
        }),
      };
    }
  }

  // Add size check plugin if enabled
  if (bundleSize !== undefined) {
    const plugins = Array.isArray(tsdownOptions.plugins) ? tsdownOptions.plugins : [];
    plugins.push(sizeLimit(bundleSize));
    tsdownOptions.plugins = plugins;
  }

  return {
    ...tsdownOptions,
    ...options,
  };
}

export default defineConfig;

export { defineConfig };
