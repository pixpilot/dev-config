/**
 * Type definitions for package.json structure
 */

export interface PackageJson {
  name?: string;
  peerDependencies?: Record<string, string>;
  dependencies?: Record<string, string>;
  exports?: string | Record<string, unknown>;
  publishConfig?: {
    exports?: string | Record<string, unknown>;
    [key: string]: unknown;
  };
}

export interface ResolvedEntryPoint {
  success: boolean;
  path: string;
  error?: string;
}
