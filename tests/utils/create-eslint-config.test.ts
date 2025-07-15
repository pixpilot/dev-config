/* eslint-disable import/order */
import type { TSESLint } from '@typescript-eslint/utils';

import { createEslintConfig } from '../../src/utils/create-eslint-config';

// Mock dependencies
jest.mock('../../src/utils/ignore-file-path', () => ({
  getIgnoreConfig: jest.fn(),
}));

jest.mock('../../src/eslint/prettier', () => [
  {
    name: 'prettier-config',
    rules: {
      'prettier/prettier': 'error',
    },
  },
]);

import { getIgnoreConfig } from '../../src/utils/ignore-file-path';

const mockedGetIgnoreConfig = getIgnoreConfig as jest.MockedFunction<
  typeof getIgnoreConfig
>;

describe('createEslintConfig', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(createEslintConfig).toBeDefined();
  });

  it('should merge config arrays and add prettier config at the end', () => {
    const config1: TSESLint.FlatConfig.ConfigArray = [
      {
        name: 'base-config',
        rules: {
          'no-console': 'warn',
        },
      },
    ];

    const config2: TSESLint.FlatConfig.ConfigArray = [
      {
        name: 'typescript-config',
        rules: {
          '@typescript-eslint/no-unused-vars': 'error',
        },
      },
    ];

    mockedGetIgnoreConfig.mockReturnValue(undefined);

    const result = createEslintConfig([config1, config2]);

    expect(result).toHaveLength(3); // base + typescript + prettier
    expect(result[0]).toStrictEqual(config1[0]);
    expect(result[1]).toStrictEqual(config2[0]);
    expect(result[2]).toStrictEqual({
      name: 'prettier-config',
      rules: {
        'prettier/prettier': 'error',
      },
    });
  });

  it('should handle additional configs parameter', () => {
    const baseConfig: TSESLint.FlatConfig.ConfigArray = [
      {
        name: 'base-config',
        rules: {
          'no-console': 'warn',
        },
      },
    ];

    const additionalConfig: TSESLint.FlatConfig.ConfigArray = [
      {
        name: 'additional-config',
        rules: {
          'no-debugger': 'error',
        },
      },
    ];

    mockedGetIgnoreConfig.mockReturnValue(undefined);

    const result = createEslintConfig([baseConfig], additionalConfig);

    expect(result).toHaveLength(3); // base + additional + prettier
    expect(result[0]).toStrictEqual(baseConfig[0]);
    expect(result[1]).toStrictEqual(additionalConfig[0]);
    expect(result[2]).toStrictEqual({
      name: 'prettier-config',
      rules: {
        'prettier/prettier': 'error',
      },
    });
  });

  it('should include ignore config when provided in options', () => {
    const baseConfig: TSESLint.FlatConfig.ConfigArray = [
      {
        name: 'base-config',
        rules: {
          'no-console': 'warn',
        },
      },
    ];

    const mockIgnoreConfig = {
      name: 'ignore-config',
      ignores: ['**/*.test.js'],
    };

    mockedGetIgnoreConfig.mockReturnValue(mockIgnoreConfig);

    const result = createEslintConfig([baseConfig], [], {
      ignoreFilePath: '.eslintignore',
    });

    expect(result).toHaveLength(3); // base + ignore + prettier
    expect(result[0]).toStrictEqual(baseConfig[0]);
    expect(result[1]).toStrictEqual(mockIgnoreConfig);
    expect(result[2]).toStrictEqual({
      name: 'prettier-config',
      rules: {
        'prettier/prettier': 'error',
      },
    });
    expect(mockedGetIgnoreConfig).toHaveBeenCalledWith({
      ignoreFilePath: '.eslintignore',
    });
  });

  it('should handle empty configs array', () => {
    mockedGetIgnoreConfig.mockReturnValue(undefined);

    const result = createEslintConfig([]);

    expect(result).toHaveLength(1); // only prettier
    expect(result[0]).toStrictEqual({
      name: 'prettier-config',
      rules: {
        'prettier/prettier': 'error',
      },
    });
  });

  it('should flatten nested config arrays', () => {
    const nestedConfig: TSESLint.FlatConfig.ConfigArray = [
      {
        name: 'config-1',
        rules: {
          'no-console': 'warn',
        },
      },
      {
        name: 'config-2',
        rules: {
          'no-debugger': 'error',
        },
      },
    ];

    mockedGetIgnoreConfig.mockReturnValue(undefined);

    const result = createEslintConfig([nestedConfig]);

    expect(result).toHaveLength(3); // config-1 + config-2 + prettier
    expect(result[0]).toStrictEqual(nestedConfig[0]);
    expect(result[1]).toStrictEqual(nestedConfig[1]);
    expect(result[2]).toStrictEqual({
      name: 'prettier-config',
      rules: {
        'prettier/prettier': 'error',
      },
    });
  });

  it('should handle all parameters together', () => {
    const baseConfig: TSESLint.FlatConfig.ConfigArray = [
      {
        name: 'base-config',
        rules: {
          'no-console': 'warn',
        },
      },
    ];

    const additionalConfig: TSESLint.FlatConfig.ConfigArray = [
      {
        name: 'additional-config',
        rules: {
          'no-debugger': 'error',
        },
      },
    ];

    const mockIgnoreConfig = {
      name: 'ignore-config',
      ignores: ['**/*.test.js'],
    };

    mockedGetIgnoreConfig.mockReturnValue(mockIgnoreConfig);

    const result = createEslintConfig([baseConfig], additionalConfig, {
      ignoreFilePath: '.eslintignore',
    });

    expect(result).toHaveLength(4); // base + additional + ignore + prettier
    expect(result[0]).toStrictEqual(baseConfig[0]);
    expect(result[1]).toStrictEqual(additionalConfig[0]);
    expect(result[2]).toStrictEqual(mockIgnoreConfig);
    expect(result[3]).toStrictEqual({
      name: 'prettier-config',
      rules: {
        'prettier/prettier': 'error',
      },
    });
  });

  it('should handle undefined options parameter', () => {
    const baseConfig: TSESLint.FlatConfig.ConfigArray = [
      {
        name: 'base-config',
        rules: {
          'no-console': 'warn',
        },
      },
    ];

    mockedGetIgnoreConfig.mockReturnValue(undefined);

    const result = createEslintConfig([baseConfig], [], undefined);

    expect(result).toHaveLength(2); // base + prettier
    expect(result[0]).toStrictEqual(baseConfig[0]);
    expect(result[1]).toStrictEqual({
      name: 'prettier-config',
      rules: {
        'prettier/prettier': 'error',
      },
    });
    expect(mockedGetIgnoreConfig).toHaveBeenCalledWith(undefined);
  });
});
