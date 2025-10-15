import type { RollupOptions } from 'rollup';
import type copy from 'rollup-plugin-copy';

type CopyOptions = Parameters<typeof copy>[0];

export interface RollupConfigOptions extends RollupOptions {
  /** Whether to treat all .ts files in src/ as entry points (multi-entry mode). */
  multiEntry?: boolean;

  /** Whether to include external dependencies in the final bundle. */
  bundleDependencies?: boolean;

  /** Whether to minify the output bundle. Defaults to true. */
  minify?: boolean;

  /** Custom entry points for the build. Can be a single file path or an array of file paths. */
  entryPoints?: string | string[];

  /** Copy options for rollup-plugin-copy. */
  copy?: CopyOptions;
}
