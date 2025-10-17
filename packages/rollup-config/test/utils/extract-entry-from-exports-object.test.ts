import { describe, expect, it } from 'vitest';
import { extractEntryFromExportsObject } from '../../src/utils/extract-entry-from-exports-object';

describe('extractEntryFromExportsObject', () => {
  it('should return string when dotExport is a string', () => {
    const result = extractEntryFromExportsObject('./dist/index.js');
    expect(result).toBe('./dist/index.js');
  });

  it('should return null when dotExport is null', () => {
    const result = extractEntryFromExportsObject(null);
    expect(result).toBeNull();
  });

  it('should return null when dotExport is undefined', () => {
    const result = extractEntryFromExportsObject(undefined);
    expect(result).toBeNull();
  });

  it('should extract "import" field from object', () => {
    const dotExport = {
      import: './dist/index.js',
      require: './dist/index.cjs',
    };
    const result = extractEntryFromExportsObject(dotExport);
    expect(result).toBe('./dist/index.js');
  });

  it('should extract "require" field when "import" is missing', () => {
    const dotExport = {
      require: './dist/index.cjs',
      default: './dist/index.js',
    };
    const result = extractEntryFromExportsObject(dotExport);
    expect(result).toBe('./dist/index.cjs');
  });

  it('should extract "default" field when "import" and "require" are missing', () => {
    const dotExport = {
      default: './dist/index.js',
    };
    const result = extractEntryFromExportsObject(dotExport);
    expect(result).toBe('./dist/index.js');
  });

  it('should return null when object has no valid export fields', () => {
    const dotExport = {
      types: './dist/index.d.ts',
    };
    const result = extractEntryFromExportsObject(dotExport);
    expect(result).toBeNull();
  });

  it('should return null when entry is empty string', () => {
    const dotExport = {
      import: '',
    };
    const result = extractEntryFromExportsObject(dotExport);
    expect(result).toBeNull();
  });

  it('should return null when entry is not a string', () => {
    const dotExport = {
      import: 123,
      require: true,
      default: null,
    };
    const result = extractEntryFromExportsObject(dotExport);
    expect(result).toBeNull();
  });

  it('should handle complex nested objects', () => {
    const dotExport = {
      node: {
        import: './dist/node.js',
      },
      import: './dist/index.js',
    };
    const result = extractEntryFromExportsObject(dotExport);
    expect(result).toBe('./dist/index.js');
  });
});
