/**
 * Enforce usage of `pnpm` as the package manager during development.
 * This script uses INIT_CWD to detect if it's running at the root level
 * (i.e., the package itself is being installed directly, not as a dependency).
 *
 * This avoids triggering warnings like "ignored build scripts" in consumer projects.
 */

import { execSync } from 'node:child_process';

if (process.env.INIT_CWD === process.cwd()) {
  execSync('npx only-allow pnpm', { stdio: 'inherit' });
}
