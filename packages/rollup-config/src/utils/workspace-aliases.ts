import type { PackageJson } from './package-types';
import path from 'node:path';
import process from 'node:process';
import { getPackages } from '@manypkg/get-packages';
import { resolvePackageEntryPoint } from './resolve-entry-point';

/**
 * Creates workspace aliases for bundling dependencies
 * Skips the current package and any private packages (with "private": true in package.json)
 */
export async function createWorkspaceAliases(
  currentPackageName: string | undefined,
): Promise<Array<{ find: string; replacement: string }>> {
  try {
    const { packages } = await getPackages(process.cwd());
    const aliases: Array<{ find: string; replacement: string }> = [];

    for (const pkg of packages) {
      // Skip self and private packages
      if (pkg.packageJson.name !== currentPackageName && !pkg.packageJson.private) {
        const resolved = resolvePackageEntryPoint(
          pkg.packageJson as PackageJson,
          pkg.dir,
        );

        if (!resolved.success) {
          throw new Error(
            resolved.error ?? 'Unknown error resolving package entry point',
          );
        }

        aliases.push({
          find: pkg.packageJson.name,
          replacement: path.join(pkg.dir, resolved.path),
        });
      }
    }

    return aliases;
  } catch (error) {
    // Not in a monorepo or error occurred
    if (error instanceof Error && error.message.includes('Cannot resolve entry point')) {
      throw error; // Re-throw entry point resolution errors
    }
    return []; // Return empty array for other errors (not in monorepo)
  }
}
