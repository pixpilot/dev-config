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

> **Note**: `defineConfig` is an async function and returns a Promise. Rollup supports async configuration files, so you can export the result directly or use `await` if needed.

### Configuration Options

- **`multiEntry`** (boolean): When `true`, treats all `.ts` files in the `src/` directory as entry points (excluding `.d.ts` files and `__tests__` folders).
- **`bundleDependencies`** (boolean): When `true`, includes external dependencies in the final bundle using `@rollup/plugin-node-resolve`. Also automatically creates workspace aliases to resolve internal monorepo packages from their built `dist` folders.
- **`minify`** (boolean): Enables minification of the output bundle using `@rollup/plugin-terser`. Defaults to `true`.
- **`entryPoints`** (string | string[]): Custom entry points for the build. Overrides the default `src/index.ts` or multi-entry behavior.
- **`copy`** (array): File copy operations using `rollup-plugin-copy`. Each item should be an object with `src` and `dest` properties.
- **`tsconfig`** (string): Path to a custom TypeScript configuration file. If not provided, automatically searches for `tsconfig.build.json` or falls back to `tsconfig.json`.

The configuration automatically:

- Outputs both CommonJS (`.cjs`) and ES module (`.js`) formats
- Uses TypeScript compilation with `@rollup/plugin-typescript`
- Excludes `peerDependencies` from the bundle
- Preserves module structure unless `bundleDependencies` is enabled
- When `bundleDependencies` is enabled, automatically resolves workspace packages from their built versions using `@rollup/plugin-alias`

## 🔧 Workspace Aliases (Monorepo Support)

When `bundleDependencies: true` is set, the configuration automatically:

1. Discovers all workspace packages in your monorepo
2. Creates aliases to resolve them from their built `dist` folders instead of source
3. Excludes the current package and any private packages
4. Uses the package's exports field to determine the correct entry point

This ensures that when bundling dependencies, internal workspace packages are resolved from their production-ready builds rather than source files.

### Example

```javascript
import { defineConfig } from '@pixpilot/rollup-config';

export default defineConfig({
  bundleDependencies: true, // Enables bundling AND automatic workspace aliases
  minify: false,
});
```

With this configuration, if your package imports `@myorg/utils`, it will automatically resolve to `../utils/dist/index.js` (or the appropriate entry point) instead of the source files.
