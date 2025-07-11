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

### ESLint

Create `eslint.config.js`:

```javascript
import config from '@pixpilot/dev-config/eslint';
export default config;
```

### ESLint + Jest

For projects with tests:

```javascript
import config from '@pixpilot/dev-config/eslint';
import jestConfig from '@pixpilot/dev-config/eslint-jest';

export default [...config, ...jestConfig];
```

#### ESLint + Jest: Requires Jest dependency above

### Prettier

Create `prettier.config.js`:

```javascript
import config from '@pixpilot/dev-config/prettier';
export default config;
```

### TypeScript

Create `tsconfig.json`:

```json
{
  "extends": "@pixpilot/dev-config/typescript",
  "compilerOptions": {
    // "module": "ES2022",
    // "moduleResolution": "Node",
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Jest

Create `jest.config.js`:

```javascript
import config from '@pixpilot/dev-config/jest';
export default config;
```

#### Jest: Requires Jest dependency above

### Markdownlint

A pre-configured `markdownlint.json` is included.

**Usage:**

```bash
npm add -D markdownlint-cli
```

To extend, use:

```json
{
  "extends": "@pixpilot/dev-config/markdownlint"
}
```

_You can customize rules by editing your own config as needed._

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
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

- See [this gist](https://gist.github.com/0xernesto/a8065cce55940e6ccc523664a87ee9bc) for setup instructions, including GitHub App creation and secret configuration.
- Required secrets: `RELEASER_ID`, `RELEASER_PRIVATE_KEY`, `NPM_TOKEN` (see gist for details).

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

### NPM packages

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

## License

MIT
