# @pixpilot/tsdown-config

Modern, opinionated tsdown configuration for TypeScript projects.

> **Note**: This configuration is designed for our organization's projects but is adaptable for your needs. Settings may evolve to enhance our codebase.

## Installation

```bash
npm install -D @pixpilot/tsdown-config
```

## Usage

Create a `tsdown.config.ts` file in your project root:

```typescript
import { defineConfig } from '@pixpilot/tsdown-config';

export default defineConfig({
  // Your custom options here
});
```

## Features

### Default Configuration

The configuration includes sensible defaults:

- **Entry**: `src/index.ts`
- **Formats**: ESM and CommonJS
- **TypeScript declarations**: Enabled
- **Tree-shaking**: Enabled
- **Minification**: Enabled
- **Clean output**: Enabled before each build

### Bundle Dependencies

By default, all dependencies and peerDependencies are externalized. To bundle them instead:

```typescript
export default defineConfig({
  bundleDependencies: true,
});
```

## API

### `defineConfig(options)`

Creates a tsdown configuration with opinionated defaults.

#### Options

Extends all [tsdown options](https://tsdown.netlify.app/) with the following additions:

##### `bundleDependencies`

- **Type**: `boolean`
- **Default**: `false`

Whether to include external dependencies in the final bundle. When `false`, all dependencies and peerDependencies are externalized.

##### `bundleSize`

- **Type**: `number | { maxSize: number; throwError?: boolean } | boolean`
- **Default**: `undefined`

Check the size of the final bundle files.

- **`number`**: Maximum size in bytes. Throws an error if exceeded.
- **`object`**: Configuration object with:
  - `maxSize` (required): Maximum size in bytes
  - `throwError` (optional, default: `true`): Whether to throw an error or just warn
- **`boolean`**: Enable/disable size checking (must provide config object or number if `true`)

**Examples:**

```typescript
// Example configurations:

// Throw error if bundle exceeds 500KB
const config1 = { bundleSize: 500 * 1024 };

// Just warn, don't fail the build
const config2 = {
  bundleSize: {
    maxSize: 500 * 1024,
    throwError: false,
  },
};
```

The plugin will output during build:

- ✓ `index.js: 245KB / 500KB` (success)
- ⚠️ `Bundle size exceeded: index.js is 600KB (max: 500KB)` (warning or error)

## Examples

### Basic Library Build

```typescript
import { defineConfig } from '@pixpilot/tsdown-config';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  bundleSize: 500 * 1024, // 500KB limit
});
```

### Bundle Everything

```typescript
import { defineConfig } from '@pixpilot/tsdown-config';

export default defineConfig({
  bundleDependencies: true,
  bundleSize: {
    maxSize: 2 * 1024 * 1024, // 2MB
    throwError: false, // Just warn
  },
});
```

## Build Output

Generates ESM (`dist/index.js`) and CommonJS (`dist/index.cjs`) formats with TypeScript declarations. Files are cleaned before each build.

## License

MIT
