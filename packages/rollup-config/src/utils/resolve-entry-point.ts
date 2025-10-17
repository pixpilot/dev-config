import type { PackageJson, ResolvedEntryPoint } from './package-types';
import fs from 'node:fs';
import path from 'node:path';
import { extractEntryFromExportsObject } from './extract-entry-from-exports-object';

/**
 * Resolves the entry point for a workspace package by checking exports in package.json
 * Returns an object with success status and the resolved path or error message
 */
export function resolvePackageEntryPoint(
  packageJson: PackageJson,
  packageDir: string,
): ResolvedEntryPoint {
  const packageName = packageJson.name ?? 'unknown';

  // Check publishConfig.exports first (used during publishing)
  const publishExports = packageJson.publishConfig?.exports;
  if (publishExports !== undefined) {
    if (typeof publishExports === 'string') {
      return { success: true, path: publishExports };
    }
    if (typeof publishExports === 'object' && publishExports['.'] !== undefined) {
      const entry = extractEntryFromExportsObject(publishExports['.']);
      if (entry !== null) {
        return { success: true, path: entry };
      }
    }
  }

  // Fallback to regular exports
  const { exports } = packageJson;
  if (exports !== undefined) {
    if (typeof exports === 'string') {
      return { success: true, path: exports };
    }
    if (typeof exports === 'object' && exports['.'] !== undefined) {
      const entry = extractEntryFromExportsObject(exports['.']);
      if (entry !== null) {
        return { success: true, path: entry };
      }
    }
  }

  // Check if default path exists
  const defaultEntry = 'dist/index.js';
  const defaultPath = path.join(packageDir, defaultEntry);
  if (fs.existsSync(defaultPath)) {
    return { success: true, path: defaultEntry };
  }

  return {
    success: false,
    path: defaultEntry,
    error:
      `Cannot resolve entry point for workspace package "${packageName}". ` +
      `No valid exports found in package.json and default path "${defaultEntry}" does not exist. ` +
      `Please add proper "exports" or "publishConfig.exports" to the package.json. ` +
      `Make sure the project is built.`,
  };
}
