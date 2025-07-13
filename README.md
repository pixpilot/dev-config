# @pixpilot/dev-config

Modern, opinionated configurations for TypeScript/JavaScript projects including ESLint, Prettier, TypeScript, and Jest configs.

> **Note**: These configs are primarily designed for internal/external packages within our organization. Some settings may not be relevant to your project or may need adjusting, but feel free to use and adapt them as needed. This package is openly available on GitHub for community use.

## Quick Start

Base installation (always required)

```bash
npm install -D @pixpilot/dev-config eslint typescript typescript-eslint
```

Prettier support

```bash
npm install -D prettier eslint-config-prettier
```

React support (optional)

```bash
npm install -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
```

Accessibility support (optional)

```bash
npm install -D eslint-plugin-jsx-a11y
```

Jest support (optional)

```bash
npm install -D jest eslint-plugin-jest
```

## Configuration

### All-in-One Setup (Recommended)

For a complete setup with all configurations:

```bash
npm install -D @pixpilot/dev-config eslint prettier typescript typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-react-refresh eslint-config-prettier jest ts-jest markdownlint-cli eslint-plugin-jest
```

Create `eslint.config.js`:

```javascript
import baseConfig from '@pixpilot/dev-config/eslint';
import jestConfig from '@pixpilot/dev-config/eslint-jest';
import prettierConfig from '@pixpilot/dev-config/eslint-prettier';
import reactConfig from '@pixpilot/dev-config/eslint-react';
import jsxA11yConfig from '@pixpilot/dev-config/eslint-jsx-a11y';

export default [
  ...baseConfig,
  ...jestConfig,
  ...reactConfig, // Optional: add for React projects
  ...jsxA11yConfig, // Optional: add for accessibility rules
  ...prettierConfig, // Always last
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
- `typescript`
- `typescript-eslint`
- `prettier`
- `eslint-config-prettier`

**Individual usage:**

```bash
npm install -D @pixpilot/dev-config eslint prettier typescript typescript-eslint eslint-config-prettier
```

```javascript
import baseConfig from '@pixpilot/dev-config/eslint';
import prettierConfig from '@pixpilot/dev-config/eslint-prettier';

export default [
  ...baseConfig,
  ...prettierConfig, // Always last
];
```

### ESLint React

ESLint configuration for React projects using TypeScript.

**Requirements:**

- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`

**Individual usage:**

```bash
npm install -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
```

**Combined with base config:**

```javascript
import baseConfig from '@pixpilot/dev-config/eslint';
import reactConfig from '@pixpilot/dev-config/eslint-react';
import prettierConfig from '@pixpilot/dev-config/eslint-prettier';

export default [...baseConfig, ...reactConfig, ...prettierConfig];
```

### ESLint Jest

ESLint configuration for Jest testing files.

**Requirements:**

- `eslint-plugin-jest`

**Individual usage:**

```bash
npm install -D eslint-plugin-jest
```

**Combined with other configs:**

```javascript
import baseConfig from '@pixpilot/dev-config/eslint';
import jestConfig from '@pixpilot/dev-config/eslint-jest';
import prettierConfig from '@pixpilot/dev-config/eslint-prettier';

export default [...baseConfig, ...jestConfig, ...prettierConfig];
```

### ESLint Prettier

ESLint configuration that disables rules conflicting with Prettier.

**Requirements:**

- `eslint-config-prettier`

**Individual usage:**

```bash
npm install -D eslint-config-prettier
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

### ESLint JSX A11y

ESLint accessibility rules for React/JS/TS projects via eslint-plugin-jsx-a11y.

**Requirements:**

- `eslint-plugin-jsx-a11y`

**Individual usage:**

```bash
npm install -D eslint-plugin-jsx-a11y
```

```javascript
import jsxA11yConfig from '@pixpilot/dev-config/eslint-jsx-a11y';
import prettierConfig from '@pixpilot/dev-config/eslint-prettier';

export default [...jsxA11yConfig, ...prettierConfig];
```

**Combined with other configs:**

```javascript
import baseConfig from '@pixpilot/dev-config/eslint';
import jsxA11yConfig from '@pixpilot/dev-config/eslint-jsx-a11y';
import prettierConfig from '@pixpilot/dev-config/eslint-prettier';

export default [...baseConfig, ...jsxA11yConfig, ...prettierConfig];
```

### Prettier

Consistent code formatting with sensible defaults.

**Requirements:**

- `prettier`
- `eslint-config-prettier`

**Individual usage:**

```bash
npm install -D prettier eslint-config-prettier
```

```javascript
import baseConfig from '@pixpilot/dev-config/eslint';
import prettierConfig from '@pixpilot/dev-config/eslint-prettier';

export default [
  ...baseConfig,
  ...prettierConfig, // Always last
];
```

### TypeScript

Optimized TypeScript configuration for bundlers (Vite, Webpack) with ES2022 modules.

**Requirements:**

- `typescript`

**Individual usage:**

```bash
npm install -D typescript
```

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
npm install -D jest ts-jest
```

```javascript
import config from '@pixpilot/dev-config/jest';
export default config;
```

### Markdownlint

Pre-configured markdownlint rules for consistent documentation formatting.

```bash
npm install -D markdownlint-cli
```

```json
{
  "extends": "@pixpilot/dev-config/markdownlint"
}
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
