# @pixpilot/dev-config

## 1.1.6-rc.3

### Patch Changes

- bd094f2: fix: add NODE_AUTH_TOKEN to environment variables for npm authentication

## 1.1.6-rc.2

### Patch Changes

- a0d172a: fix: update pre.json format and add .changeset/ to .prettierignore and ESLint config

## 1.1.6-rc.1

### Patch Changes

- 97aee31: chore: update package.json for version 1.1.5 release
- c8bfcd6: fix pre.json format

## 1.1.6-rc.0

### Patch Changes

- e5bc2a5: test

## 1.1.5

### Patch Changes

- 6071205: fix: correct environment variable name for npm authentication

## 1.1.4

### Patch Changes

- c9dbe00: fix: streamline npm authentication setup in publish workflow

## 1.1.3

### Patch Changes

- 1802741: fix: remove npm authentication setup from publish workflow

## 1.1.2

### Patch Changes

- c20266f: fix: update npm authentication setup in publish workflow

## 1.1.1

### Patch Changes

- 503d6b7: re-publish

## 1.1.0

### Minor Changes

- 4faa393: eslint-jest rule change

## 1.0.21

### Patch Changes

- 390d869: remove redundant ignore patterns from ESLint configuration

## 1.0.20

### Patch Changes

- 9ac09cf: add coverage directory to ESLint ignore patterns

## 1.0.19

### Patch Changes

- 8215ace: add 'build' directory to ESLint ignore patterns

## 1.0.18

### Patch Changes

- cac4862: disable GitHub releases creation in release PR step

## 1.0.17

### Patch Changes

- 6e17f27: update publish workflow and refine changeset commands
- e7bf1d8: update publish workflow to include id-token permission and refine release steps
- f2a7dc1: enable GitHub releases creation in release PR step
- b4e7be5: chore: ensure Git user is set up for release PR creation

## 1.0.15

### Patch Changes

- update changeset commands and improve ESLint ignore patterns

## 1.0.14

### Patch Changes

- 4fd3b7d: Add exclusion for nested node_modules in ESLint configuration

## 1.0.13

### Patch Changes

- e052042: Ignore source map files
- 7c5c3ea: Force New Version
- 2c99c45: Add 'no-implicit-coercion' rule to ESLint configuration

## 1.0.12

### Patch Changes

- f20fbea: Revert
- a634720: retry

## 1.0.11

### Patch Changes

- 4cd1d69: changed printWidth

## 1.0.10

### Patch Changes

- Setup Changesets for automated version management and publishing. This replaces the manual version checking workflow with a more robust solution that handles version bumping, changelog generation, and automated publishing.
