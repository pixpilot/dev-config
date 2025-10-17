import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createWorkspaceAliases } from '../../src/utils/workspace-aliases';

// Mock @manypkg/get-packages
vi.mock('@manypkg/get-packages', () => ({
  getPackages: vi.fn(),
}));

describe('createWorkspaceAliases', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'workspace-test-'));
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it('should create aliases for workspace packages', async () => {
    const { getPackages } = await import('@manypkg/get-packages');

    // Create mock package directories
    const pkg1Dir = path.join(tempDir, 'packages', 'pkg1');
    const pkg2Dir = path.join(tempDir, 'packages', 'pkg2');

    fs.mkdirSync(path.join(pkg1Dir, 'dist'), { recursive: true });
    fs.mkdirSync(path.join(pkg2Dir, 'dist'), { recursive: true });
    fs.writeFileSync(path.join(pkg1Dir, 'dist', 'index.js'), 'export {}');
    fs.writeFileSync(path.join(pkg2Dir, 'dist', 'index.js'), 'export {}');

    vi.mocked(getPackages).mockResolvedValue({
      packages: [
        {
          packageJson: {
            name: '@test/pkg1',
            version: '1.0.0',
            exports: './dist/index.js',
          } as any,
          dir: pkg1Dir,
          relativeDir: 'packages/pkg1',
        },
        {
          packageJson: {
            name: '@test/pkg2',
            version: '1.0.0',
            publishConfig: {
              exports: './dist/main.js',
            },
          } as any,
          dir: pkg2Dir,
          relativeDir: 'packages/pkg2',
        },
        {
          packageJson: {
            name: '@test/current',
            version: '1.0.0',
          } as any,
          dir: tempDir,
          relativeDir: '.',
        },
      ] as any,
      rootPackage: null as any,
      rootDir: tempDir,
      tool: 'pnpm' as any,
    });

    // Mock process.cwd() to return tempDir
    const originalCwd = process.cwd;
    process.cwd = vi.fn(() => tempDir);

    const aliases = await createWorkspaceAliases('@test/current');

    process.cwd = originalCwd;

    expect(aliases).toHaveLength(2);
    expect(aliases).toContainEqual({
      find: '@test/pkg1',
      replacement: path.join(pkg1Dir, 'dist/index.js'),
    });
    expect(aliases).toContainEqual({
      find: '@test/pkg2',
      replacement: path.join(pkg2Dir, 'dist/main.js'),
    });
  });

  it('should exclude current package from aliases', async () => {
    const { getPackages } = await import('@manypkg/get-packages');

    vi.mocked(getPackages).mockResolvedValue({
      packages: [
        {
          packageJson: {
            name: '@test/current',
            version: '1.0.0',
            exports: './dist/index.js',
          } as any,
          dir: tempDir,
          relativeDir: '.',
        },
        {
          packageJson: {
            name: '@test/other',
            version: '1.0.0',
            exports: './dist/index.js',
          } as any,
          dir: path.join(tempDir, 'packages', 'other'),
          relativeDir: 'packages/other',
        },
      ] as any,
      rootPackage: null as any,
      rootDir: tempDir,
      tool: 'pnpm' as any,
    });

    const originalCwd = process.cwd;
    process.cwd = vi.fn(() => tempDir);

    const aliases = await createWorkspaceAliases('@test/current');

    process.cwd = originalCwd;

    expect(aliases).toHaveLength(1);
    expect(aliases[0]?.find).toBe('@test/other');
  });

  it('should throw error when entry point cannot be resolved', async () => {
    const { getPackages } = await import('@manypkg/get-packages');

    vi.mocked(getPackages).mockResolvedValue({
      packages: [
        {
          packageJson: { name: '@test/broken', version: '1.0.0' } as any,
          dir: path.join(tempDir, 'packages', 'broken'),
          relativeDir: 'packages/broken',
        },
      ] as any,
      rootPackage: null as any,
      rootDir: tempDir,
      tool: 'pnpm' as any,
    });

    const originalCwd = process.cwd;
    process.cwd = vi.fn(() => tempDir);

    await expect(createWorkspaceAliases('@test/current')).rejects.toThrow(
      'Cannot resolve entry point',
    );

    process.cwd = originalCwd;
  });

  it('should return empty array when not in a monorepo', async () => {
    const { getPackages } = await import('@manypkg/get-packages');

    vi.mocked(getPackages).mockRejectedValue(new Error('Not a monorepo'));

    const originalCwd = process.cwd;
    process.cwd = vi.fn(() => tempDir);

    const aliases = await createWorkspaceAliases('@test/current');

    process.cwd = originalCwd;

    expect(aliases).toEqual([]);
  });

  it('should handle undefined package name', async () => {
    const { getPackages } = await import('@manypkg/get-packages');

    const pkgDir = path.join(tempDir, 'packages', 'pkg');
    fs.mkdirSync(path.join(pkgDir, 'dist'), { recursive: true });
    fs.writeFileSync(path.join(pkgDir, 'dist', 'index.js'), 'export {}');

    vi.mocked(getPackages).mockResolvedValue({
      packages: [
        {
          packageJson: {
            name: '@test/pkg',
            version: '1.0.0',
            exports: './dist/index.js',
          } as any,
          dir: pkgDir,
          relativeDir: 'packages/pkg',
        },
      ] as any,
      rootPackage: null as any,
      rootDir: tempDir,
      tool: 'pnpm' as any,
    });

    const originalCwd = process.cwd;
    process.cwd = vi.fn(() => tempDir);

    const aliases = await createWorkspaceAliases(undefined);

    process.cwd = originalCwd;

    expect(aliases).toHaveLength(1);
  });

  it('should handle complex export paths', async () => {
    const { getPackages } = await import('@manypkg/get-packages');

    const pkgDir = path.join(tempDir, 'packages', 'pkg');
    fs.mkdirSync(path.join(pkgDir, 'dist', 'esm'), { recursive: true });
    fs.writeFileSync(path.join(pkgDir, 'dist', 'esm', 'index.mjs'), 'export {}');

    vi.mocked(getPackages).mockResolvedValue({
      packages: [
        {
          packageJson: {
            name: '@test/pkg',
            version: '1.0.0',
            publishConfig: {
              exports: {
                '.': {
                  import: './dist/esm/index.mjs',
                  require: './dist/cjs/index.js',
                },
              },
            },
          } as any,
          dir: pkgDir,
          relativeDir: 'packages/pkg',
        },
      ] as any,
      rootPackage: null as any,
      rootDir: tempDir,
      tool: 'pnpm' as any,
    });

    const originalCwd = process.cwd;
    process.cwd = vi.fn(() => tempDir);

    const aliases = await createWorkspaceAliases('@test/current');

    process.cwd = originalCwd;

    expect(aliases).toHaveLength(1);
    expect(aliases[0]?.replacement).toBe(path.join(pkgDir, 'dist/esm/index.mjs'));
  });

  it('should skip private packages', async () => {
    const { getPackages } = await import('@manypkg/get-packages');

    const publicPkgDir = path.join(tempDir, 'packages', 'public');
    const privatePkgDir = path.join(tempDir, 'packages', 'private');

    fs.mkdirSync(path.join(publicPkgDir, 'dist'), { recursive: true });
    fs.mkdirSync(path.join(privatePkgDir, 'dist'), { recursive: true });
    fs.writeFileSync(path.join(publicPkgDir, 'dist', 'index.js'), 'export {}');
    fs.writeFileSync(path.join(privatePkgDir, 'dist', 'index.js'), 'export {}');

    vi.mocked(getPackages).mockResolvedValue({
      packages: [
        {
          packageJson: {
            name: '@test/public',
            version: '1.0.0',
            exports: './dist/index.js',
          } as any,
          dir: publicPkgDir,
          relativeDir: 'packages/public',
        },
        {
          packageJson: {
            name: '@internal/private',
            version: '1.0.0',
            private: true,
            exports: './dist/index.js',
          } as any,
          dir: privatePkgDir,
          relativeDir: 'packages/private',
        },
      ] as any,
      rootPackage: null as any,
      rootDir: tempDir,
      tool: 'pnpm' as any,
    });

    const originalCwd = process.cwd;
    process.cwd = vi.fn(() => tempDir);

    const aliases = await createWorkspaceAliases('@test/current');

    process.cwd = originalCwd;

    expect(aliases).toHaveLength(1);
    expect(aliases[0]?.find).toBe('@test/public');
    expect(aliases.find((a) => a.find === '@internal/private')).toBeUndefined();
  });
});
