import { describe, expect, it } from 'vitest';
import { RollupConfigError } from '../../src/utils/errors';

describe('rollupConfigError', () => {
  it('should create an error with the correct prefix', () => {
    const error = new RollupConfigError('test message');
    expect(error.message).toBe('[@pixpilot/rollup-config] test message');
    expect(error.name).toBe('RollupConfigError');
    expect(error).toBeInstanceOf(Error);
  });
});
