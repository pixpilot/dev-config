import fs from 'node:fs';

/**
 * Resolves the TypeScript configuration file path.
 * If customTsconfig is provided, uses it.
 * Otherwise, checks for './tsconfig.build.json' first, then falls back to './tsconfig.json'.
 * @param customTsconfig - Optional custom tsconfig path
 * @returns The resolved tsconfig path
 */
export function resolveTsconfig(customTsconfig?: string): string {
  let tsconfig: string;
  if (customTsconfig != null) {
    tsconfig = customTsconfig;
  } else if (fs.existsSync('./tsconfig.build.json')) {
    tsconfig = './tsconfig.build.json';
  } else {
    tsconfig = './tsconfig.json';
  }
  // eslint-disable-next-line no-console
  console.log(`Using tsconfig: ${tsconfig}`);
  return tsconfig;
}
