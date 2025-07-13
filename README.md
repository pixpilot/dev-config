## **@pixpilot/dev-config**

Modern, opinionated configurations for TypeScript/JavaScript projects including ESLint, Prettier, TypeScript, and Jest configs.

> **Note**: These configs are designed for our organization's projects. Feel free to use and adapt them, but some settings may require adjustment for your specific needs. These settings may change over time to improve the codebase.

---

### \#\# 🚀 Quick Start: A Step-by-Step Guide

Follow this guide to get your project configured. We'll start with a base setup and then add features as needed.

#### **Step 1: Core Configuration (ESLint, Prettier, TypeScript)**

##### **Install Base Dependencies**

```bash
npm install -D @pixpilot/dev-config eslint typescript typescript-eslint prettier eslint-config-prettier
```

##### **Create `eslint.config.js`**

This file will be the central hub for all our linting rules.

```javascript
import baseConfig from '@pixpilot/dev-config/eslint';
import prettierConfig from '@pixpilot/dev-config/eslint-prettier';

export default [
  ...baseConfig,
  // ...add feature configs here
  ...prettierConfig, // Prettier must be last
];
```

##### **Create `prettier.config.js`**

```javascript
import config from '@pixpilot/dev-config/prettier';
export default config;
```

##### **Create `tsconfig.json`**

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

---

#### **Step 2: Add Features (As Needed)**

Now, add support for testing, React, or Next.js.

##### **🧪 Add Jest for Testing**

1.  **Install Jest dependencies:**

    ```bash
    npm install -D jest ts-jest eslint-plugin-jest
    ```

2.  **Update `eslint.config.js`:** Add the Jest config.

    ```javascript
    import baseConfig from '@pixpilot/dev-config/eslint';
    import jestConfig from '@pixpilot/dev-config/eslint-jest'; // 👈 Add this
    import prettierConfig from '@pixpilot/dev-config/eslint-prettier';

    export default [
      ...baseConfig,
      ...jestConfig, // 👈 Add this
      ...prettierConfig, // Prettier must be last
    ];
    ```

3.  ##### **Create `jest.config.js`**

    ```javascript
    import config from '@pixpilot/dev-config/jest';
    export default config;
    ```

##### **⚛️ Add React**

1.  **Install React dependencies:**

    ```bash
    npm install -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-react-refresh
    ```

2.  **Update `eslint.config.js`:** Add React and JSX accessibility configs.

    ```javascript
    import baseConfig from '@pixpilot/dev-config/eslint';
    import reactConfig from '@pixpilot/dev-config/eslint-react'; // 👈 Add this
    import jsxA11yConfig from '@pixpilot/dev-config/eslint-jsx-a11y'; // 👈 Add this
    import prettierConfig from '@pixpilot/dev-config/eslint-prettier';

    export default [
      ...baseConfig,
      ...reactConfig, // 👈 Add this
      ...jsxA11yConfig, // 👈 Add this
      ...prettierConfig, // Prettier must be last
    ];
    ```

##### **🌐 Add Next.js**

1.  **Install Next.js dependencies:**

    ```bash
    npm install -D @next/eslint-plugin-next
    ```

2.  **Update `eslint.config.js`:** Add the Next.js config. This typically includes React rules, so you may not need to add `reactConfig` separately if using Next.

    ```javascript
    import baseConfig from '@pixpilot/dev-config/eslint';
    import nextConfig from '@pixpilot/dev-config/eslint-next'; // 👈 Add this
    // ... other configs like Jest, React, etc.
    import prettierConfig from '@pixpilot/dev-config/eslint-prettier';

    export default [
      ...baseConfig,
      // ... other configs
      ...nextConfig, // 👈 Add this
      ...prettierConfig, // Prettier must be last
    ];
    ```

---

### \#\# 📋 Example Setups

Here is how the final configuration would look for common project types.

#### **Node.js + Jest Project**

1.  **Combined Installation:**

    ```bash
    npm install -D @pixpilot/dev-config eslint typescript typescript-eslint prettier eslint-config-prettier jest ts-jest eslint-plugin-jest
    ```

2.  **Final `eslint.config.js`:**

    ```javascript
    import baseConfig from '@pixpilot/dev-config/eslint';
    import jestConfig from '@pixpilot/dev-config/eslint-jest';
    import prettierConfig from '@pixpilot/dev-config/eslint-prettier';

    export default [
      ...baseConfig,
      ...jestConfig,
      ...prettierConfig, // Always last
    ];
    ```

    _(Remember to also create [`prettier.config.js`](https://www.google.com/search?q=%23create-prettierconfigjs), [`tsconfig.json`](https://www.google.com/search?q=%23create-tsconfigjson), and [`jest.config.js`](https://www.google.com/search?q=%23create-jestconfigjs) from the steps above)._

#### **React + Jest Project**

1.  **Combined Installation:**

    ```bash
    npm install -D @pixpilot/dev-config eslint typescript typescript-eslint prettier eslint-config-prettier jest ts-jest eslint-plugin-jest eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-react-refresh
    ```

2.  **Final `eslint.config.js`:**

    ```javascript
    import baseConfig from '@pixpilot/dev-config/eslint';
    import jestConfig from '@pixpilot/dev-config/eslint-jest';
    import prettierConfig from '@pixpilot/dev-config/eslint-prettier';
    import reactConfig from '@pixpilot/dev-config/eslint-react';
    import jsxA11yConfig from '@pixpilot/dev-config/eslint-jsx-a11y';

    export default [
      ...baseConfig,
      ...jestConfig,
      ...reactConfig,
      ...jsxA11yConfig,
      ...prettierConfig, // Always last
    ];
    ```

    _(Remember to also create [`prettier.config.js`](https://www.google.com/search?q=%23create-prettierconfigjs), [`tsconfig.json`](https://www.google.com/search?q=%23create-tsconfigjson), and [`jest.config.js`](https://www.google.com/search?q=%23create-jestconfigjs) from the steps above)._

#### **Next.js + Jest Project**

1.  **Combined Installation:**

    ```bash
    npm install -D @pixpilot/dev-config eslint typescript typescript-eslint prettier eslint-config-prettier jest ts-jest eslint-plugin-jest eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-react-refresh @next/eslint-plugin-next
    ```

2.  **Final `eslint.config.js`:**

    ```javascript
    import baseConfig from '@pixpilot/dev-config/eslint';
    import jestConfig from '@pixpilot/dev-config/eslint-jest';
    import nextConfig from '@pixpilot/dev-config/eslint-next';
    import prettierConfig from '@pixpilot/dev-config/eslint-prettier';
    import reactConfig from '@pixpilot/dev-config/eslint-react';
    import jsxA11yConfig from '@pixpilot/dev-config/eslint-jsx-a11y';

    export default [
      ...baseConfig,
      ...jestConfig,
      ...reactConfig,
      ...nextConfig,
      ...jsxA11yConfig,
      ...prettierConfig, // Always last
    ];
    ```

    _(Remember to also create [`prettier.config.js`](https://www.google.com/search?q=%23create-prettierconfigjs), [`tsconfig.json`](https://www.google.com/search?q=%23create-tsconfigjson), and [`jest.config.js`](https://www.google.com/search?q=%23create-jestconfigjs) from the steps above)._

---

### \#\# ⚙️ Customization

Override rules and settings by adding a new object to your config array.

#### **Override ESLint Rules**

```javascript
// eslint.config.js
import baseConfig from '@pixpilot/dev-config/eslint';

export default [
  ...baseConfig,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn', // Override a rule
    },
  },
  // ... other configs like Prettier
];
```

#### **Override Prettier Settings**

```javascript
// prettier.config.js
import baseConfig from '@pixpilot/dev-config/prettier';

export default {
  ...baseConfig,
  printWidth: 100, // Override a setting
};
```

---

### \#\# 📦 Other Configurations

#### **MarkdownLint**

1.  **Install:** `npm install -D markdownlint-cli`
2.  **Create `.markdownlint.json`:**

    ```json
    {
      "extends": "@pixpilot/dev-config/markdownlint"
    }
    ```

#### **TypeScript Presets**

Extend the base `tsconfig.json` for specific environments.

- **For Node.js Projects:**

  ```json
  {
    "extends": "@pixpilot/dev-config/typescript",
    "compilerOptions": {
      "module": "Node16",
      "moduleResolution": "Node16"
    }
  }
  ```

- **For NPM Packages:**

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

---

### \#\# 🔄 GitHub Workflows

Use our reusable workflows for CI/CD tasks.

#### **CodeQL Analysis**

```yaml
jobs:
  code-analysis:
    uses: pixpilot/dev-config/.github/workflows/codeql-analysis.yml@main
    with:
      language: '["javascript", "typescript"]'
```

#### **Dependabot Auto-merge**

```yaml
jobs:
  dependabot-auto-merge:
    uses: pixpilot/dev-config/.github/workflows/dependabot-auto-merge.yml@main
```

#### **CodeQL Issue Creator**

This community-provided workflow runs CodeQL analysis and automatically creates a separate GitHub issue for each new finding, helping you track vulnerabilities as actionable items.

> **Note**: For most repositories, you should consider **using GitHub's official code security tools** like the standard CodeQL workflow, which is free for public repositories. Use this issue creator at your own discretion.

```yaml
jobs:
  codeql-issue-creator:
    uses: pixpilot/dev-config/.github/workflows/codeql-issue-maker.yml@main
    with:
      language: 'typescript' # Can be 'javascript', 'python', etc.
```

#### **Semantic Release**

```yaml
jobs:
  release:
    uses: pixpilot/dev-config/.github/workflows/semantic-release-protected-branch.yml@main
    secrets:
      RELEASER_ID: ${{ secrets.RELEASER_ID }}
      RELEASER_PRIVATE_KEY: ${{ secrets.RELEASER_PRIVATE_KEY }}
      npm_TOKEN: ${{ secrets.NPM_TOKEN }}
```

> See [this gist](https://gist.github.com/0xernesto/a8065cce55940e6ccc523664a87ee9bc) for setup instructions.

---

### \#\# ⚠️ Requirements

- Node.js 18+
- ESLint 9+
- Prettier 3.6+
- TypeScript 5.0+
