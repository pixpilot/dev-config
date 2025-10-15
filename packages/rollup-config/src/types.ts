import type { RollupOptions } from 'rollup';

export interface RollupConfigOptions extends RollupOptions {
  /** Whether to treat all .ts files in src/ as entry points (multi-entry mode). */
  multiEntry?: boolean;

  /** Whether to include external dependencies in the final bundle. */
  bundleDependencies?: boolean;

  /** Whether to minify the output bundle. Defaults to true. */
  minify?: boolean;

  /** Custom entry points for the build. Can be a single file path or an array of file paths. */
  entryPoints?: string | string[];
}
