import path from 'path';

import { createReactEslintConfig } from '../src/create-react-eslint-config';

describe('createReactEslintConfig', () => {
  it('should be defined', () => {
    expect(createReactEslintConfig).toBeDefined();
  });

  it('should return a config array with all required configs', () => {
    const config = createReactEslintConfig();
    expect(Array.isArray(config)).toBe(true);
    // Should include base, jest, react, jsx-a11y, and prettier configs
    expect(config.length).toBeGreaterThanOrEqual(5);
  });

  it('should merge additional configs', () => {
    const additional = [{ name: 'custom' }];
    const config = createReactEslintConfig(additional);
    expect(config.some((c: any) => c.name === 'custom')).toBe(true);
  });

  it('should include ignore config if options.ignoreFilePath is provided', () => {
    const absPath = path.resolve(__dirname, '../.gitignore');
    const config = createReactEslintConfig([], { ignoreFilePath: absPath });
    // Find the ignore config object
    const ignoreConfig = config.find(
      (c: any) => c && typeof c === 'object' && ('ignores' in c || 'ignorePatterns' in c),
    );
    expect(ignoreConfig).toBeDefined();
    expect(
      typeof ignoreConfig === 'object' &&
        ('ignores' in ignoreConfig || 'ignorePatterns' in ignoreConfig),
    ).toBe(true);
  });
});
