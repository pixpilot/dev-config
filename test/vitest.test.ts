import { describe, expect, it } from 'vitest';
import makeConfig from '../src/vitest';

describe('makeConfig', () => {
  it('returns the default config when called with no arguments', () => {
    const config = makeConfig();
    expect(config).toHaveProperty('test');
    if (config.test) {
      expect(config.test).toHaveProperty('globals', true);
      expect(config.test).toHaveProperty('environment', 'node');
      if (config.test.coverage) {
        expect(config.test.coverage).toHaveProperty('enabled', false);
      }
    }
  });

  it('merges user config with default config', () => {
    const userConfig = {
      test: {
        globals: false,
        environment: 'jsdom',
        coverage: {
          enabled: true,
        },
      },
    };
    const config = makeConfig(userConfig);
    if (config.test) {
      expect(config.test.globals).toBe(false);
      expect(config.test.environment).toBe('jsdom');
      if (config.test.coverage) {
        expect(config.test.coverage.enabled).toBe(true);
        // Should still have other default properties
        expect(config.test.coverage).toHaveProperty('provider', 'v8');
      }
    }
  });
});
