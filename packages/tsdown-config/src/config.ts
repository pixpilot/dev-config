import type { SizeLimitOption } from '@pixpilot/rollup-plugin-size-limit';

import type { Options as TsDownOptions } from 'tsdown';
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

function defineConfig(options: Options): Options {
  const { bundleDependencies, bundleSize } = options;

  const tsdownOptions: Options = {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    treeshake: true,
    clean: true,
    minify: true,
  };

  if (bundleDependencies) {
    // Bundle everything
    tsdownOptions.noExternal = [/.*/u];
  } else {
    // Externalize all dependencies and peerDependencies
    // Private workspace packages are automatically filtered out by getExternalPackages
    const externalPackages = getExternalPackages(process.cwd());

    // Set external to only externalize packages in the list
    tsdownOptions.external = (id: string, _parentId?: string, _isResolved?: boolean) => {
      // Check if it's in our external packages list
      if (externalPackages.includes(id)) {
        return true;
      }
      // Always externalize node: protocol imports
      if (id.startsWith('node:')) {
        return true;
      }
      return false;
    };

    // Also explicitly bundle private workspace packages using noExternal
    // This ensures they are bundled even if they match other external patterns
    const privatePackages = getPrivateWorkspacePackages(process.cwd());
    if (privatePackages.length > 0) {
      tsdownOptions.noExternal = privatePackages.map(
        (pkg: string) =>
          new RegExp(`^${pkg.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')}$`, 'u'),
      );
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
