/**
 * Set up Husky Git hooks during local development (e.g., pre-commit lint checks).
 * This script runs only when the package is being installed directly,
 * not when it's a dependency, to prevent triggering lifecycle script warnings in consumers.
 */

import { execSync } from 'child_process';

if (process.env.INIT_CWD === process.cwd()) {
  execSync('husky', { stdio: 'inherit' });
}
