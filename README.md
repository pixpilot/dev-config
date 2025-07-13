# @pixpilot/dev-config

Modern, opinionated configurations for TypeScript/JavaScript projects including ESLint, Prettier, TypeScript, and Jest configs.

> **Note**: These configs are primarily designed for internal/external packages within our organization. Some settings may not be relevant to your project or may need adjusting, but feel free to use and adapt them as needed. This package is openly available on GitHub for community use.

## Quick Start

```bash
npm install -D @pixpilot/dev-config
npm install -D eslint prettier typescript
```

**Optional dependencies:**

```bash
# For Jest support
npm install -D jest
```

## Configuration

### All-in-One Setup (Recommended)

For a complete setup with all configurations:

```bash
npm add -D @pixpilot/dev-config eslint prettier typescript eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-react-refresh eslint-config-prettier jest ts-jest markdownlint-cli eslint-plugin-jest
```

Create `eslint.config.js`:

```javascript
import baseConfig from '@pixpilot/dev-config/eslint';
import reactConfig from '@pixpilot/dev-config/eslint-react';
import jestConfig from '@pixpilot/dev-config/eslint-jest';
import prettierConfig from '@pixpilot/dev-config/eslint-prettier';
import eslintConfigPrettier from 'eslint-config-prettier

export default [
  ...baseConfig,
  ...reactConfig,
  ...jsxA11yConfig,
  ...jestConfig,
  ...eslintConfigPrettier, // Always last
];
```

Create `prettier.config.js`:

```javascript
import config from '@pixpilot/dev-config/prettier';
export default config;
```

Create `tsconfig.json`:

```json
{
  "extends": "@pixpilot/dev-config/typescript",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

Create `jest.config.js`:

```javascript
import config from '@pixpilot/dev-config/jest';
export default config;
```

## Individual Configurations

### ESLint (Base)

ESLint configuration for TypeScript projects with import sorting and type-checking.

**Requirements:**

- `eslint`
- `prettier`
- `typescript`
- `eslint-config-prettier`
- `eslint-plugin-import`

**Individual usage:**

```bash
npm add -D @pixpilot/dev-config eslint prettier typescript eslint-config-prettier eslint-plugin-import
```

```javascript
import config from '@pixpilot/dev-config/eslint';
export default config;
```

**Combined with other configs:**

```javascript
import baseConfig from '@pixpilot/dev-config/eslint';
import reactConfig from '@pixpilot/dev-config/eslint-react';

export default [...baseConfig, ...reactConfig];
```

### ESLint React

ESLint configuration for React projects using TypeScript.

**Requirements:**

- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `eslint-plugin-jsx-a11y`
- `eslint-plugin-react-refresh`

**Individual usage:**

```bash
npm add -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-react-refresh
```

```javascript
import config from '@pixpilot/dev-config/eslint-react';
export default config;
```

**Combined with base config:**

```javascript
import baseConfig from '@pixpilot/dev-config/eslint';
import reactConfig from '@pixpilot/dev-config/eslint-react';

export default [...baseConfig, ...reactConfig];
```

### ESLint Jest

ESLint configuration for Jest testing files.

**Requirements:**

- `eslint-plugin-jest`

**Individual usage:**

```bash
npm add -D eslint-plugin-jest
```

```javascript
import config from '@pixpilot/dev-config/eslint-jest';
export default config;
```

**Combined with other configs:**

```javascript
import baseConfig from '@pixpilot/dev-config/eslint';
import jestConfig from '@pixpilot/dev-config/eslint-jest';

export default [...baseConfig, ...jestConfig];
```

### ESLint Prettier

ESLint configuration that disables rules conflicting with Prettier.

**Requirements:**

- `eslint-config-prettier`

**Individual usage:**

```bash
npm add -D eslint-config-prettier
```

```javascript
import config from '@pixpilot/dev-config/eslint-prettier';
export default config;
```

**Combined with other configs (should be last):**

```javascript
import baseConfig from '@pixpilot/dev-config/eslint';
import prettierConfig from '@pixpilot/dev-config/eslint-prettier';

export default [
  ...baseConfig,
  ...prettierConfig, // Always last
];
```

### Prettier

Consistent code formatting with sensible defaults.

```javascript
import config from '@pixpilot/dev-config/prettier';
export default config;
```

### TypeScript

Optimized TypeScript configuration for bundlers (Vite, Webpack) with ES2022 modules.

```json
{
  "extends": "@pixpilot/dev-config/typescript",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Jest

ESM support, ts-jest transform, 80% coverage threshold.

**Requirements:**

- `jest`
- `ts-jest`

**Individual usage:**

```bash
npm add -D jest ts-jest
```

```javascript
import config from '@pixpilot/dev-config/jest';
export default config;
```

**Combined with other configs:**

```javascript
import baseConfig from '@pixpilot/dev-config/eslint';
import jestConfig from '@pixpilot/dev-config/eslint-jest';

export default [...baseConfig, ...jestConfig];
```

### Markdownlint

Pre-configured markdownlint rules for consistent documentation formatting.

```bash
npm add -D markdownlint-cli
```

```json
{
  "extends": "@pixpilot/dev-config/markdownlint"
}
```

### ESLint JSX A11y

ESLint accessibility rules for React/JS/TS projects via eslint-plugin-jsx-a11y.

**Requirements:**

- `eslint-plugin-jsx-a11y`

**Individual usage:**

```bash
npm add -D eslint-plugin-jsx-a11y
```

```javascript
import config from '@pixpilot/dev-config/eslint-jsx-a11y';
export default config;
```

**Combined with other configs:**

```javascript
import baseConfig from '@pixpilot/dev-config/eslint';
import jsxA11yConfig from '@pixpilot/dev-config/eslint-jsx-a11y';

export default [...baseConfig, ...jsxA11yConfig];
```

## GitHub Workflows

Reusable workflows for common CI/CD tasks:

### CodeQL Analysis

```yaml
jobs:
  code-analysis:
    uses: pixpilot/dev-config/.github/workflows/codeql-analysis.yml@main
    with:
      language: '["javascript", "typescript"]'
```

### Dependabot Auto-merge

```yaml
jobs:
  dependabot-auto-merge:
    uses: pixpilot/dev-config/.github/workflows/dependabot-auto-merge.yml@main
```

### Semantic Release (Reusable)

> **Note:** This workflow is designed for use with protected PR branches.

```yaml
jobs:
  release:
    uses: pixpilot/dev-config/.github/workflows/semantic-release-protected-branch.yml@main
    secrets:
      RELEASER_ID: ${{ secrets.RELEASER_ID }}
      RELEASER_PRIVATE_KEY: ${{ secrets.RELEASER_PRIVATE_KEY }}
      npm_TOKEN: ${{ secrets.npm_TOKEN }}
```

- See [this gist](https://gist.github.com/0xernesto/a8065cce55940e6ccc523664a87ee9bc) for setup instructions, including GitHub App creation and secret configuration.
- Required secrets: `RELEASER_ID`, `RELEASER_PRIVATE_KEY`, `npm_TOKEN` (see gist for details).

## Features

**ESLint**: TypeScript-first with import sorting and type-checking
**Prettier**: Consistent formatting with sensible defaults
**TypeScript**: Optimized for bundlers (Vite, Webpack) with ES2022 modules
**Jest**: ESM support, ts-jest transform, 80% coverage threshold
**Workflows**: Reusable GitHub Actions for security scanning and dependency management

## TypeScript Presets

### Node.js projects

```json
{
  "extends": "@pixpilot/dev-config/typescript",
  "compilerOptions": {
    "module": "Node16",
    "moduleResolution": "Node16"
  }
}
```

### npm packages

```json
{
  "extends": "@pixpilot/dev-config/typescript",
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "nodenext",
    "declaration": true
  }
}
```

## Customization

### Override ESLint rules

```javascript
import baseConfig from '@pixpilot/dev-config/eslint';

export default [
  ...baseConfig,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
```

### Override Prettier settings

```javascript
import baseConfig from '@pixpilot/dev-config/prettier';

export default {
  ...baseConfig,
  printWidth: 100,
};
```

## Requirements

- Node.js 18+
- ESLint 9+
- Prettier 3.6+
- TypeScript 5.0+
- Jest (optional, for testing support)
- Markdownlint cli (optional)

## License

MIT
