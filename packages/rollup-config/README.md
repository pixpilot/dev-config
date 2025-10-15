# @pixpilot/rollup-config

Modern, opinionated Rollup configuration for TypeScript projects.

> **Note**: This configuration is designed for our organization's projects but is adaptable for your needs. Settings may evolve to enhance our codebase.

## 🚀 Installation

Your project needs to have `rollup` installed, as it is a peer dependency.

1. **Install the necessary packages:**

   ```bash
   npm install -D @pixpilot/rollup-config rollup
   ```

## ⚙️ Usage

Create a `rollup.config.js` file in your project root:

```javascript
import { defineConfig } from '@pixpilot/rollup-config';

export default defineConfig({
  // Options (all optional)
  minify: true, // Enable minification (default: true)
  multiEntry: false, // Treat all .ts files in src/ as entry points
  bundleDependencies: false, // Include external dependencies in the bundle
  entryPoints: 'src/index.ts', // Custom entry points (default: 'src/index.ts')
  copy: [
    { src: 'README.md', dest: 'dist/' },
    { src: 'assets/**/*', dest: 'dist/assets/' },
  ], // Copy files to output directory
});
```

### Configuration Options

- **`multiEntry`** (boolean): When `true`, treats all `.ts` files in the `src/` directory as entry points (excluding `.d.ts` files and `__tests__` folders).
- **`bundleDependencies`** (boolean): When `true`, includes external dependencies in the final bundle using `@rollup/plugin-node-resolve`.
- **`minify`** (boolean): Enables minification of the output bundle using `@rollup/plugin-terser`. Defaults to `true`.
- **`entryPoints`** (string | string[]): Custom entry points for the build. Overrides the default `src/index.ts` or multi-entry behavior.
- **`copy`** (array): File copy operations using `rollup-plugin-copy`. Each item should be an object with `src` and `dest` properties.

The configuration automatically:

- Outputs both CommonJS (`.cjs`) and ES module (`.js`) formats
- Uses TypeScript compilation with `@rollup/plugin-typescript`
- Excludes `peerDependencies` from the bundle
- Preserves module structure unless `bundleDependencies` is enabled
