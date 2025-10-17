import type { PackageJson } from '../../src/utils/package-types';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { resolvePackageEntryPoint } from '../../src/utils/resolve-entry-point';

describe('resolvePackageEntryPoint', () => {
  let tempDir: string;

  beforeEach(() => {
    // Create a temporary directory for tests
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rollup-test-'));
  });

  afterEach(() => {
    // Clean up temporary directory
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  describe('publishConfig.exports', () => {
    it('should resolve from publishConfig.exports as string', () => {
      const packageJson: PackageJson = {
        name: 'test-package',
        publishConfig: {
          exports: './dist/published.js',
        },
      };

      const result = resolvePackageEntryPoint(packageJson, tempDir);

      expect(result.success).toBe(true);
      expect(result.path).toBe('./dist/published.js');
    });

    it('should resolve from publishConfig.exports["."] as string', () => {
      const packageJson: PackageJson = {
        name: 'test-package',
        publishConfig: {
          exports: {
            '.': './dist/main.js',
          },
        },
      };

      const result = resolvePackageEntryPoint(packageJson, tempDir);

      expect(result.success).toBe(true);
      expect(result.path).toBe('./dist/main.js');
    });

    it('should resolve from publishConfig.exports["."] import field', () => {
      const packageJson: PackageJson = {
        name: 'test-package',
        publishConfig: {
          exports: {
            '.': {
              import: './dist/esm.js',
              require: './dist/cjs.js',
            },
          },
        },
      };

      const result = resolvePackageEntryPoint(packageJson, tempDir);

      expect(result.success).toBe(true);
      expect(result.path).toBe('./dist/esm.js');
    });

    it('should prefer import over require in publishConfig', () => {
      const packageJson: PackageJson = {
        name: 'test-package',
        publishConfig: {
          exports: {
            '.': {
              import: './dist/esm.js',
              require: './dist/cjs.js',
              default: './dist/default.js',
            },
          },
        },
      };

      const result = resolvePackageEntryPoint(packageJson, tempDir);

      expect(result.success).toBe(true);
      expect(result.path).toBe('./dist/esm.js');
    });
  });

  describe('exports field', () => {
    it('should resolve from exports as string', () => {
      const packageJson: PackageJson = {
        name: 'test-package',
        exports: './dist/index.js',
      };

      const result = resolvePackageEntryPoint(packageJson, tempDir);

      expect(result.success).toBe(true);
      expect(result.path).toBe('./dist/index.js');
    });

    it('should resolve from exports["."] as string', () => {
      const packageJson: PackageJson = {
        name: 'test-package',
        exports: {
          '.': './dist/main.js',
        },
      };

      const result = resolvePackageEntryPoint(packageJson, tempDir);

      expect(result.success).toBe(true);
      expect(result.path).toBe('./dist/main.js');
    });

    it('should resolve from exports["."] require field', () => {
      const packageJson: PackageJson = {
        name: 'test-package',
        exports: {
          '.': {
            require: './dist/cjs.js',
            default: './dist/default.js',
          },
        },
      };

      const result = resolvePackageEntryPoint(packageJson, tempDir);

      expect(result.success).toBe(true);
      expect(result.path).toBe('./dist/cjs.js');
    });

    it('should fallback to default field', () => {
      const packageJson: PackageJson = {
        name: 'test-package',
        exports: {
          '.': {
            default: './dist/default.js',
          },
        },
      };

      const result = resolvePackageEntryPoint(packageJson, tempDir);

      expect(result.success).toBe(true);
      expect(result.path).toBe('./dist/default.js');
    });
  });

  describe('priority and fallback', () => {
    it('should prioritize publishConfig.exports over exports', () => {
      const packageJson: PackageJson = {
        name: 'test-package',
        publishConfig: {
          exports: './dist/published.js',
        },
        exports: './dist/normal.js',
      };

      const result = resolvePackageEntryPoint(packageJson, tempDir);

      expect(result.success).toBe(true);
      expect(result.path).toBe('./dist/published.js');
    });

    it('should fallback to exports when publishConfig has no valid exports', () => {
      const packageJson: PackageJson = {
        name: 'test-package',
        publishConfig: {
          access: 'public',
        },
        exports: './dist/normal.js',
      };

      const result = resolvePackageEntryPoint(packageJson, tempDir);

      expect(result.success).toBe(true);
      expect(result.path).toBe('./dist/normal.js');
    });

    it('should check for default dist/index.js when no exports defined', () => {
      const packageJson: PackageJson = {
        name: 'test-package',
      };

      // Create dist/index.js
      const distDir = path.join(tempDir, 'dist');
      fs.mkdirSync(distDir, { recursive: true });
      fs.writeFileSync(path.join(distDir, 'index.js'), 'export default {}');

      const result = resolvePackageEntryPoint(packageJson, tempDir);

      expect(result.success).toBe(true);
      expect(result.path).toBe('dist/index.js');
    });

    it('should return error when no exports found and dist/index.js does not exist', () => {
      const packageJson: PackageJson = {
        name: 'test-package',
      };

      const result = resolvePackageEntryPoint(packageJson, tempDir);

      expect(result.success).toBe(false);
      expect(result.path).toBe('dist/index.js');
      expect(result.error).toContain('Cannot resolve entry point');
      expect(result.error).toContain('test-package');
      expect(result.error).toContain('dist/index.js');
    });

    it('should return error with package name when name is undefined', () => {
      const packageJson: PackageJson = {};

      const result = resolvePackageEntryPoint(packageJson, tempDir);

      expect(result.success).toBe(false);
      expect(result.error).toContain('unknown');
    });
  });

  describe('edge cases', () => {
    it('should handle exports with non-"." keys', () => {
      const packageJson: PackageJson = {
        name: 'test-package',
        exports: {
          './subpath': './dist/subpath.js',
        },
      };

      const result = resolvePackageEntryPoint(packageJson, tempDir);

      expect(result.success).toBe(false);
    });

    it('should handle empty exports object', () => {
      const packageJson: PackageJson = {
        name: 'test-package',
        exports: {},
      };

      const result = resolvePackageEntryPoint(packageJson, tempDir);

      expect(result.success).toBe(false);
    });

    it('should handle exports["." ] with no valid fields', () => {
      const packageJson: PackageJson = {
        name: 'test-package',
        exports: {
          '.': {
            types: './dist/index.d.ts',
          },
        },
      };

      const result = resolvePackageEntryPoint(packageJson, tempDir);

      expect(result.success).toBe(false);
    });
  });
});
