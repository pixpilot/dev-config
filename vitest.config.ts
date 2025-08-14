import vitestConfig from './src/vitest';

export default vitestConfig({
  test: {
    coverage: {
      enabled: false,
    },
  },
});
