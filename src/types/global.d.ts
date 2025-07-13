declare module '@next/eslint-plugin-next' {
  import type { ESLint, Linter } from 'eslint';

  interface NextEslintPluginConfig {
    rules: Linter.RulesRecord;
  }

  interface NextEslintPlugin {
    configs: {
      recommended: NextEslintPluginConfig;
      'core-web-vitals': NextEslintPluginConfig;
    };
    rules: Record<string, ESLint.RuleModule>;
  }

  const plugin: NextEslintPlugin;
  export default plugin;
}
