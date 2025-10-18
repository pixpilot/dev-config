import type { Packages } from '@manypkg/get-packages';

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import { getPackagesSync } from '@manypkg/get-packages';

interface PackageJson {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  name?: string;
  private?: boolean;
}

/**
 * Gets all external packages that should not be bundled
 * Includes dependencies and peerDependencies from the current package,
 * excluding private workspace packages
 */
export function getExternalPackages(rootDir: string): string[] {
  const resolvedRootDir = path.isAbsolute(rootDir)
    ? rootDir
    : path.resolve(process.cwd(), rootDir);

  const packageJsonPath = path.resolve(resolvedRootDir, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    throw new Error(`package.json not found at ${packageJsonPath}`);
  }

  const packageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, 'utf-8'),
  ) as PackageJson;

  const external = new Set<string>();

  // Add all dependencies
  if (packageJson.dependencies != null) {
    for (const dep of Object.keys(packageJson.dependencies)) {
      external.add(dep);
    }
  }

  // Add all peerDependencies
  if (packageJson.peerDependencies != null) {
    for (const dep of Object.keys(packageJson.peerDependencies)) {
      external.add(dep);
    }
  }

  // Filter out private workspace packages (they should be bundled along with their dependencies)
  return filterPrivateWorkspacePackages(Array.from(external), resolvedRootDir);
}

/**
 * Filters out private workspace packages from the external packages list
 * @param externalPackages - List of package names to filter
 * @param currentDir - Current package directory
 * @returns Filtered list excluding private workspace packages
 */
function filterPrivateWorkspacePackages(
  externalPackages: string[],
  currentDir: string,
): string[] {
  try {
    const privatePackageNames = getPrivateWorkspacePackages(currentDir);
    const privateSet = new Set(privatePackageNames);
    return externalPackages.filter((pkg) => !privateSet.has(pkg));
  } catch {
    // Not in a monorepo or error occurred, return all external packages
    return externalPackages;
  }
}

/**
 * Finds all private workspace packages in a monorepo using @manypkg/get-packages
 * @param startDir - Directory to start searching from
 * @returns Array of private package names
 */
export function getPrivateWorkspacePackages(startDir: string): string[] {
  const privatePackages = new Set<string>();

  try {
    const result = getPackagesSync(startDir) as unknown as Packages;

    for (const pkg of result.packages) {
      if (pkg.packageJson.private === true && pkg.packageJson.name != null) {
        privatePackages.add(pkg.packageJson.name);
      }
    }
  } catch {
    // Not in a monorepo or error occurred, return empty set
    return Array.from(privatePackages);
  }

  return Array.from(privatePackages);
}
