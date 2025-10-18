import { globSync } from 'glob';

export interface ResolveEntryPointsOptions {
  entry?: string | string[];
}

function isGlobPattern(pattern: string): boolean {
  return (
    pattern.includes('*') ||
    pattern.includes('{') ||
    pattern.includes('[') ||
    pattern.includes('?')
  );
}

export function resolveEntryPoints(options?: ResolveEntryPointsOptions): string[] {
  const { entry: customEntryPoints } = options || {};

  if (customEntryPoints !== undefined) {
    if (typeof customEntryPoints === 'string') {
      return isGlobPattern(customEntryPoints)
        ? globSync(customEntryPoints)
        : [customEntryPoints];
    }
    if (Array.isArray(customEntryPoints)) {
      return customEntryPoints.flatMap((pattern) =>
        isGlobPattern(pattern) ? globSync(pattern) : [pattern],
      );
    }
  }

  return globSync('src/**/*.ts').filter((file) => !file.endsWith('.d.ts'));
}
