# @pixpilot/dev-config

Modern, opinionated configurations for TypeScript/JavaScript projects, simplified.

> **Note**: These configurations are designed for our organization's projects but are adaptable for your needs. Settings may evolve to enhance our codebase.

## 🚀 Installation

Getting started is simple. Your project needs to have `eslint`, `prettier`, and `typescript` installed, as they are peer dependencies.

1.  **Install the necessary packages:**

    ```bash
    npm install -D @pixpilot/dev-config eslint prettier typescript
    ```

2.  **Install Jest (Optional):**
    If your project uses Jest for testing, install it separately. Our ESLint configs will automatically apply Jest rules if it's detected.

    ```bash
    npm install -D jest
    ```

## ⚙️ Usage

All the required ESLint plugins are bundled in this package. The easiest way to get started is to use one of the pre-configured creator functions that match your project type.

### ESLint Usage

Choose the creator function that matches your project type and create an `eslint.config.js` file.

#### **Node.js Project**

```javascript
import path from 'node:path';
import { createNodejsConfig } from '@pixpilot/dev-config';

export default createNodejsConfig([], {
  // Best practice: ensure the path is relative to your eslint.config.js
  ignoreFilePath: path.join(import.meta.dirname, '.gitignore'),
});
```

#### **React Project**

```javascript
import path from 'node:path';
import { createReactEslintConfig } from '@pixpilot/dev-config';

export default createReactEslintConfig([], {
  // Best practice: ensure the path is relative to your eslint.config.js
  ignoreFilePath: path.join(import.meta.dirname, '.gitignore'),
});
```

#### **Next.js Project**

```javascript
import path from 'node:path';
import { createNextjsEslintConfig } from '@pixpilot/dev-config';

export default createNextjsEslintConfig([], {
  // Best practice: ensure the path is relative to your eslint.config.js
  ignoreFilePath: path.join(import.meta.dirname, '.gitignore'),
});
```

### Prettier Usage

Create `prettier.config.js` to use the shared Prettier setup.

```javascript
import config from '@pixpilot/dev-config/prettier';
export default config;
```

### TypeScript

Create `tsconfig.json` to extend the base configuration.

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

If you are using Jest, create a `jest.config.js` file.

```javascript
import config from '@pixpilot/dev-config/jest';
export default config;
```

### MarkdownLint

1.  **Install:** `npm install -D markdownlint-cli`
2.  **Create `.markdownlint.json`:**

    ```json
    {
      "extends": "@pixpilot/dev-config/markdownlint"
    }
    ```

## 🔧 Configuration Options

### ESLint

#### Included ESLint Modules

While using the main `create-*` functions is recommended, you can also import individual modules for advanced customization. These modules are located under the `@pixpilot/dev-config/eslint/` path.

- **`base`**: `@pixpilot/dev-config/eslint/base` - The core set of rules for all TypeScript projects.
- **`react`**: `@pixpilot/dev-config/eslint/react` - Rules for React applications, including hooks and refresh.
- **`nextjs`**: `@pixpilot/dev-config/eslint/nextjs` - Specific rules for Next.js projects.
- **`jsx-a11y`**: `@pixpilot/dev-config/eslint/jsx-a11y` - Accessibility rules for JSX.
- **`jest`**: `@pixpilot/dev-config/eslint/jest` - Linting rules for Jest test files.
- **`prettier`**: `@pixpilot/dev-config/eslint/prettier` - Turns off conflicting style rules to let Prettier handle formatting. It should always be last in your config array.

#### Using `create-*` Function Options

Each `create-*` function accepts two optional arguments for customization (`additionalConfigs` and `options`), as shown in the signature below:

```typescript
/**
 * @param additionalConfigs An array of additional ESLint configuration objects to merge.
 * @param options An object for advanced settings.
 */
function createEslintConfig(
  additionalConfigs?: ESLintConfig[],
  options?: EslintConfigOptions,
): ESLintConfig[];

interface EslintConfigOptions {
  /**
   * Optional path to an ignore file to be included in the ESLint config.
   * Defaults to the project's root .gitignore file.
   */
  ignoreFilePath?: string;
}
```

#### Overriding ESLint Rules

To add or override ESLint rules, pass a configuration array to the first argument (`additionalConfigs`).

```javascript
// eslint.config.js
import path from 'node:path';
import { createNextjsEslintConfig } from '@pixpilot/dev-config';

const myCustomRules = [
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn', // Override a rule
      'react/jsx-key': 'off', // Disable a rule
    },
  },
];

export default createNextjsEslintConfig(myCustomRules, {
  ignoreFilePath: path.join(import.meta.dirname, '.gitignore'),
});
```

#### Specifying an Ignore File

Use the `ignoreFilePath` property within the `options` object to specify a custom ignore file.

```javascript
// eslint.config.js
import path from 'node:path';
import { createNextjsEslintConfig } from '@pixpilot/dev-config';

export default createNextjsEslintConfig(
  [], // No additional rule configs
  {
    // Best practice: ensure the path is relative to your eslint.config.js
    ignoreFilePath: path.join(import.meta.dirname, '.gitignore'),
  },
);
```

#### Building a Custom ESLint Configuration

For maximum control, you can use the `createEslintConfig` helper to build your own configuration from our individual modules. This function will always add the Prettier config at the end of the array to ensure it correctly overrides other styling rules.

```javascript
import { createEslintConfig } from '@pixpilot/dev-config';
import baseConfig from '@pixpilot/dev-config/eslint/base';
import jestConfig from '@pixpilot/dev-config/eslint/jest';

// Combine the desired configs into an array
const myConfigs = [baseConfig, jestConfig];

// Pass them to the creator function
export default createEslintConfig(myConfigs);
```

### Prettier Advanced Usage

#### Overriding Prettier Settings

Extend the base configuration in your `prettier.config.js`.

```javascript
// prettier.config.js
import baseConfig from '@pixpilot/dev-config/prettier';

export default {
  ...baseConfig,
  printWidth: 100, // Override a setting
};
```

## ⚠️ Requirements

- Node.js 18+
- ESLint 9+
- Prettier 3.6+
- TypeScript 5.0+
