# @pixpilot/dev-config

Modern, opinionated configurations for TypeScript/JavaScript projects, simplified.

> **Note**: These configurations are designed for our organization's projects but are adaptable for your needs. Settings may evolve to enhance our codebase.

## 🚀 Installation

Getting started is simple. Your project needs to have `prettier` and `typescript` installed, as they are peer dependencies.

1.  **Install the necessary packages:**

    ```bash
    npm install -D @pixpilot/dev-config
    ```

2.  **Install Jest (Optional):**
    If your project uses Jest for testing, install it separately.

    ```bash
    npm install -D jest ts-jest
    ```

## ⚙️ Usage

All the required Prettier plugins are bundled in this package. The easiest way to get started is to use the shared Prettier setup and TypeScript base config.

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

If you are using Jest, you must install both `jest` and `ts-jest`:

```bash
npm install -D jest ts-jest
```

Create a `jest.config.js` file:

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

### Commitlint

1.  **Install:** `npm install -D @commitlint/cli @commitlint/config-conventional`
2.  **Create `commitlint.config.mjs` in your project root:**

    ```javascript
    import config from '@pixpilot/dev-config/commitlint';

    export default config;
    ```
