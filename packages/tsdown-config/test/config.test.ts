import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { defineConfig } from '../src/config';

// Mock fs and path modules
vi.mock('node:fs');
vi.mock('node:path');
vi.mock('node:process', () => ({
  default: {
    cwd: vi.fn(() => '/test/project'),
  },
}));

describe('defineConfig', () => {
  it('should externalize dependencies and peerDependencies by default', () => {
    const mockPackageJson = {
      name: 'test-package',
      dependencies: {
        dep1: '^1.0.0',
        dep2: '^2.0.0',
      },
      peerDependencies: {
        peer1: '^1.0.0',
      },
    };

    vi.mocked(path.resolve).mockReturnValue('/test/project/package.json');
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson));

    const config = defineConfig({});

    expect(typeof config.external).toBe('function');
    // Test the external function
    if (typeof config.external === 'function') {
      expect(config.external('dep1', undefined, false)).toBe(true);
      expect(config.external('dep2', undefined, false)).toBe(true);
      expect(config.external('peer1', undefined, false)).toBe(true);
      expect(config.external('not-a-dep', undefined, false)).toBe(false);
      expect(config.external('node:fs', undefined, false)).toBe(true);
    }
    expect(config.noExternal).toBeUndefined();
  });

  it('should bundle everything when bundleDependencies is true', () => {
    const mockPackageJson = {
      name: 'test-package',
      dependencies: {
        dep1: '^1.0.0',
      },
    };

    vi.mocked(path.resolve).mockReturnValue('/test/project/package.json');
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson));

    const config = defineConfig({ bundleDependencies: true });

    expect(config.noExternal).toEqual([/.*/u]);
    expect(config.external).toBeUndefined();
  });

  it('should handle missing package.json gracefully', () => {
    vi.mocked(path.resolve).mockReturnValue('/test/project/package.json');
    vi.mocked(fs.existsSync).mockReturnValue(false);

    expect(() => defineConfig({})).toThrow(
      'package.json not found at /test/project/package.json',
    );
  });

  it('should handle package.json without dependencies', () => {
    const mockPackageJson = {
      name: 'test-package',
    };

    vi.mocked(path.resolve).mockReturnValue('/test/project/package.json');
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson));

    const config = defineConfig({});

    expect(typeof config.external).toBe('function');
    // Test the external function - should return false for non-node packages
    if (typeof config.external === 'function') {
      expect(config.external('some-package', undefined, false)).toBe(false);
      expect(config.external('node:fs', undefined, false)).toBe(true);
    }
  });

  it('should merge user options with default config', () => {
    const mockPackageJson = {
      name: 'test-package',
    };

    vi.mocked(path.resolve).mockReturnValue('/test/project/package.json');
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson));

    const config = defineConfig({
      entry: ['src/custom.ts'],
      minify: false,
    });

    expect(config.entry).toEqual(['src/custom.ts']);
    expect(config.minify).toBe(false);
  });

  it('should add size check plugin when bundleSize option is provided', () => {
    const mockPackageJson = {
      name: 'test-package',
    };

    vi.mocked(path.resolve).mockReturnValue('/test/project/package.json');
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson));

    const config = defineConfig({
      bundleSize: 1024 * 1024, // 1MB
    });

    expect(config.plugins).toBeDefined();
    expect(Array.isArray(config.plugins)).toBe(true);
    if (Array.isArray(config.plugins)) {
      expect(config.plugins.length).toBeGreaterThan(0);
    }
  });

  it('should not add size check plugin when bundleSize is undefined', () => {
    const mockPackageJson = {
      name: 'test-package',
    };

    vi.mocked(path.resolve).mockReturnValue('/test/project/package.json');
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson));

    const config = defineConfig({});

    expect(config.plugins).toBeUndefined();
  });
});
