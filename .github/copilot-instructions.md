# Copilot Instructions

- Only use pnpm for installing or managing dependencies in this project. Do not use npm, yarn, or any other package manager.

## Documentation Organization Guidelines

When organizing the README.md Configuration section, follow this structure:

### 1. Configuration Section Structure

```markdown
## Configuration

### All-in-One Setup (Recommended)

- Show complete setup with all dependencies
- Provide example config files for all tools
- Use npm commands only

## Individual Configurations

### [Tool Name] ([Subcategory if applicable])

- Brief description of what the config provides
- **Requirements:** section listing all dependencies
- **Individual usage:** section with install command and standalone usage
- **Combined usage:** section showing how to merge with other configs
```

### 2. Individual Config Section Template

Each config should follow this exact template:

````markdown
### [Config Name]

[Brief description of functionality]

**Requirements:**

- `package-name-1`
- `package-name-2`
- `package-name-3`

**Individual usage:**

```bash
npm add -D [all-required-packages]
```
````

```javascript
import config from '@pixpilot/dev-config/[config-name]';
export default config;
```

**Combined with other configs:**

```javascript
import baseConfig from '@pixpilot/dev-config/eslint';
import [configName] from '@pixpilot/dev-config/[config-name]';

export default [
  ...baseConfig,
  ...[configName],
];
```
