export class RollupConfigError extends Error {
  constructor(message: string) {
    super(`[@pixpilot/rollup-config] ${message}`);
    this.name = 'RollupConfigError';
  }
}
