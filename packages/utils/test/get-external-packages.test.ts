import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  getExternalPackages,
  getPrivateWorkspacePackages,
} from '../src/get-external-packages';

describe('getExternalPackages', () => {
  it('should return external packages from dependencies and peerDependencies', () => {
    const tempDir = fs.mkdtempSync(path.join(process.cwd(), 'test-temp-'));
    const packageJsonPath = path.join(tempDir, 'package.json');
    const packageJson = {
      dependencies: {
        lodash: '^4.17.0',
        react: '^18.0.0',
      },
      peerDependencies: {
        typescript: '^5.0.0',
      },
    };
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    const result = getExternalPackages(tempDir);
    expect(result).toEqual(['lodash', 'react', 'typescript']);

    // Cleanup
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('should throw an error if package.json is not found', () => {
    const nonExistentDir = path.join(process.cwd(), 'non-existent-dir');
    expect(() => getExternalPackages(nonExistentDir)).toThrow(
      `package.json not found at ${path.join(nonExistentDir, 'package.json')}`,
    );
  });

  it('should return empty array if no dependencies or peerDependencies', () => {
    const tempDir = fs.mkdtempSync(path.join(process.cwd(), 'test-temp-'));
    const packageJsonPath = path.join(tempDir, 'package.json');
    const packageJson = {
      name: 'test-package',
    };
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    const result = getExternalPackages(tempDir);
    expect(result).toEqual([]);

    // Cleanup
    fs.rmSync(tempDir, { recursive: true, force: true });
  });
});

describe('getPrivateWorkspacePackages', () => {
  it('should detect private workspace packages in monorepo', () => {
    // Test with the actual workspace
    const result = getPrivateWorkspacePackages(process.cwd());

    // Should include @internal/utils which is marked as private
    expect(result).toContain('@internal/utils');
  });

  it('should return empty array when not in a monorepo', () => {
    // Create a temp directory outside the current workspace
    const osTempDir = fs.realpathSync(os.tmpdir());
    const tempDir = fs.mkdtempSync(path.join(osTempDir, 'test-temp-'));
    const packageJsonPath = path.join(tempDir, 'package.json');
    const packageJson = {
      name: 'test-package',
    };
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    const result = getPrivateWorkspacePackages(tempDir);
    expect(result).toEqual([]);

    // Cleanup
    fs.rmSync(tempDir, { recursive: true, force: true });
  });
});
