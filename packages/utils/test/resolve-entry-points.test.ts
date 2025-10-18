import { describe, expect, it } from 'vitest';

import { resolveEntryPoints } from '../src/resolve-entry-points';

describe('resolveEntryPoints', () => {
  it('returns custom entry points when provided', () => {
    const result = resolveEntryPoints({ entry: 'custom.ts' });
    expect(result).toEqual(['custom.ts']);
  });

  it('returns custom entry points array when provided', () => {
    const result = resolveEntryPoints({ entry: ['a.ts', 'b.ts'] });
    expect(result).toEqual(['a.ts', 'b.ts']);
  });

  it('returns default entry points when no options', () => {
    const result = resolveEntryPoints({});
    expect(result).toEqual([
      'src\\resolve-entry-points.ts',
      'src\\index.ts',
      'src\\get-external-packages.ts',
    ]);
  });
});
