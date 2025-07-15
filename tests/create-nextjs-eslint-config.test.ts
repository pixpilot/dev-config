import path from 'path';

import { createNextjsEslintConfig } from '../src/create-nextjs-eslint-config';

describe('createNextjsEslintConfig', () => {
  it('should be defined', () => {
    expect(createNextjsEslintConfig).toBeDefined();
  });

  it('should return a config array with all required configs', () => {
    const config = createNextjsEslintConfig();
    expect(Array.isArray(config)).toBe(true);
    // Should include base, jest, react, nextjs, jsx-a11y, and prettier configs
    expect(config.length).toBeGreaterThanOrEqual(6);
  });

  it('should merge additional configs', () => {
    const additional = [{ name: 'custom' }];
    const config = createNextjsEslintConfig(additional);
    expect(config.some((c: any) => c.name === 'custom')).toBe(true);
  });

  it('should include ignore config if options.ignoreFilePath is provided', () => {
    const absPath = path.resolve(__dirname, '../.gitignore');
    const config = createNextjsEslintConfig([], { ignoreFilePath: absPath });
    // Find the ignore config object
    const ignoreConfig = config.find(
      (c: any) => c && typeof c === 'object' && ('ignores' in c || 'ignorePatterns' in c),
    );

    expect(ignoreConfig).toBeDefined();
    // Should have either 'ignores' or 'ignorePatterns' property
    expect(
      typeof ignoreConfig === 'object' &&
        ('ignores' in ignoreConfig || 'ignorePatterns' in ignoreConfig),
    ).toBe(true);
  });
});
