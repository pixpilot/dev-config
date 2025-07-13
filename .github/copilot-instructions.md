## General Guidelines

- **Package Manager**: Only use `pnpm` for installing or managing dependencies within this project's actual source code. However, for all `README.md` and other documentation files, always use `npm` commands (`npm add -D ...`) for user-facing examples.
- **File Naming**: When creating a new configuration, the file name in the repository should correspond to the entry point specified in the documentation (e.g., a config for `eslint-foo` would be accessed via `@pixpilot/dev-config/eslint-foo`).

---

## README.md Documentation Structure

When you're asked to add a new ESLint configuration to the documentation, you must follow the structure below precisely. The new configuration should be added under the "Individual Configurations" section in `README.md`.

### New ESLint Configuration Template

Use this template for any new ESLint-related configuration.

````markdown
### ESLint [Tool Name]

[A brief, one-sentence description of what the tool/plugin does and why it's used.]

**Requirements:**

- `package-name-1`
- `package-name-2`
- ...

**Individual usage:**

```bash
npm add -D [list all required packages here]
```
````

```javascript
// Example: eslint.config.js
import [configName]Config from '@pixpilot/dev-config/eslint-[tool-name]';
import prettierConfig from '@pixpilot/dev-config/eslint-prettier';

export default [
  ...[configName]Config,
  ...prettierConfig, // Always last
];
```

**Combined with base config:**

```javascript
// Example: eslint.config.js
import baseConfig from '@pixpilot/dev-config/eslint';
import [configName]Config from '@pixpilot/dev-config/eslint-[tool-name]';
import prettierConfig from '@pixpilot/dev-config/eslint-prettier';

export default [
  ...baseConfig,
  ...[configName]Config,
  ...prettierConfig, // Always last
];
```

````

### Explanation of Template Fields

1.  **Heading (`### ESLint [Tool Name]`)**: The heading must start with "ESLint" followed by the capitalized name of the tool (e.g., "ESLint React", "ESLint Jest").
2.  **Description**: Provide a concise, user-friendly description of the configuration's purpose.
3.  **Requirements**: List all `npm` packages required for this specific configuration to work. Do not include packages that are part of the base setup (like `eslint` or `typescript`).
4.  **Individual usage**:
    * Show the `npm add -D` command with all the required packages for a standalone setup.
    * Provide a basic `eslint.config.js` example showing how to use the configuration on its own. It should almost always include the `prettierConfig` at the end.
5.  **Combined with base config**:
    * Provide a more common `eslint.config.js` example showing how the new configuration is added alongside the `baseConfig`.
    * Ensure the import statement is clear (`import [configName]Config from '@pixpilot/dev-config/eslint-[tool-name]';`).
    * The final exported array should always have `...baseConfig` first and `...prettierConfig` last for consistency.

By following this structure, you will ensure that any new documentation you generate seamlessly integrates with the existing `README.md` file.
```
````
