# [2.1.0](https://github.com/pixpilot/dev-config/compare/v2.0.9...v2.1.0) (2025-07-24)


### Features

* **commitlint:** add commitlint configuration ([a779e06](https://github.com/pixpilot/dev-config/commit/a779e066367f2ff5831ae8541c3157e8779624c8))

## [2.0.9](https://github.com/pixpilot/dev-config/compare/v2.0.8...v2.0.9) (2025-07-16)


### Bug Fixes

* remove unused imports and gitignore handling from ESLint config ([d3076e0](https://github.com/pixpilot/dev-config/commit/d3076e0282bff97ef8e40c08ba0bbb6c2b5967c9))

## [2.0.8](https://github.com/pixpilot/dev-config/compare/v2.0.7...v2.0.8) (2025-07-16)


### Bug Fixes

* update preinstall and prepare scripts to use npx only-allow and husky ([d1f2b05](https://github.com/pixpilot/dev-config/commit/d1f2b057a775566dfe354fcf0f8e4f41cd19b552))

## [2.0.7](https://github.com/pixpilot/dev-config/compare/v2.0.6...v2.0.7) (2025-07-16)


### Bug Fixes

* add markdownlint configuration to package exports ([3660039](https://github.com/pixpilot/dev-config/commit/36600395ef5e668cbfe22baaeafa8f3d669ed087))

## [2.0.6](https://github.com/pixpilot/dev-config/compare/v2.0.5...v2.0.6) (2025-07-16)


### Bug Fixes

* restore preinstall and prepare scripts for package management ([cb10ee0](https://github.com/pixpilot/dev-config/commit/cb10ee00a4f49a578ef322a692ebf0a9e4c78553))

## [2.0.5](https://github.com/pixpilot/dev-config/compare/v2.0.4...v2.0.5) (2025-07-16)


### Bug Fixes

* update preinstall and prepare scripts for improved package management ([173284c](https://github.com/pixpilot/dev-config/commit/173284c2f3f4a2be6b92ee3d5c97447ab5cb69e1))

## [2.0.4](https://github.com/pixpilot/dev-config/compare/v2.0.3...v2.0.4) (2025-07-16)


### Bug Fixes

* remove unnecessary devDependency link for dev-config ([77c3fdb](https://github.com/pixpilot/dev-config/commit/77c3fdb4928f5447ad32d4eee5f8c4d9973b4405))
* replace preinstall and prepare scripts with custom implementations ([ff94f5a](https://github.com/pixpilot/dev-config/commit/ff94f5af39377bbffe1d2b7ebaf084470c1f9ae2))

## [2.0.3](https://github.com/pixpilot/dev-config/compare/v2.0.2...v2.0.3) (2025-07-15)


### Bug Fixes

* update eslint dependency specifier to allow minimum version ([221d4ed](https://github.com/pixpilot/dev-config/commit/221d4edcb9195c9b88fa20e443c35af1bb953a73))
* update peerDependencies to use minimum version constraints ([a929251](https://github.com/pixpilot/dev-config/commit/a9292518ebb6fda936fae9d964abea07652f239e))

## [2.0.2](https://github.com/pixpilot/dev-config/compare/v2.0.1...v2.0.2) (2025-07-15)


### Bug Fixes

* update author name and dependencies in package.json ([b615042](https://github.com/pixpilot/dev-config/commit/b61504250d72b6368040d1e6d87840f0976ae494))

## [2.0.1](https://github.com/pixpilot/dev-config/compare/v2.0.0...v2.0.1) (2025-07-15)


### Bug Fixes

* correct import for Node.js ESLint configuration in README ([e9e2457](https://github.com/pixpilot/dev-config/commit/e9e245784fdfc67a1b03707c9d1cc6481c155d3b))

# [2.0.0](https://github.com/pixpilot/dev-config/compare/v1.6.2...v2.0.0) (2025-07-15)


* Next ([#21](https://github.com/pixpilot/dev-config/issues/21)) ([b0724f4](https://github.com/pixpilot/dev-config/commit/b0724f4bc4f0b882005ba4bb8a81a6cc578ca90c))


### chore

* **release:** force a new major release ([09323e3](https://github.com/pixpilot/dev-config/commit/09323e3fc2194b849ccc21393d4892be6cc993ec))


### BREAKING CHANGES

* **release:** This commit forces a major version bump to v2.0.0.
* add ESLint configuration functions for React, Node.js, and Next.js projects

* refactor: update test script to use .mjs extension and modify tsconfig module setting

* chore(release): 1.6.2-rc.1 [skip ci]

## [1.6.2-rc.1](https://github.com/pixpilot/dev-config/compare/v1.6.1...v1.6.2-rc.1) (2025-07-14)

### Bug Fixes

* update Prettier configuration and streamline tsconfig exclusion list ([5ff470f](https://github.com/pixpilot/dev-config/commit/5ff470fe3b6f5785028f551e6203c5c1d9f19455))

* add vite

* Restructure ESLint configuration and improve TypeScript support

- Added rollup.config.js for building TypeScript files into CommonJS and ES modules.
- Removed outdated copy-assets.js script and create-nextjs-config.ts.
- Introduced create-nextjs-eslint-config.ts, create-nodejs-eslint-config.ts, and create-react-eslint-config.ts for better ESLint configuration management.
- Created base ESLint configuration in src/eslint/base.ts with TypeScript support and import rules.
- Added Jest-specific ESLint configuration in src/eslint/jest.ts.
- Implemented accessibility rules using eslint-plugin-jsx-a11y in src/eslint/jsx-a11y.ts.
- Added Next.js specific ESLint rules in src/eslint/nextjs.ts.
- Integrated Prettier compatibility in src/eslint/prettier.ts.
- Enhanced React ESLint configuration in src/eslint/react.ts with hooks and refresh support.
- Updated index.ts to export new ESLint configuration functions and types.
- Introduced common types for ESLint configuration options in src/types/common.ts.
- Created utility functions for merging ESLint configurations in src/utils/create-eslint-config.ts.
- Added ignore file handling in src/utils/ignore-file-path.ts.
- Updated tsconfig.build.json to include src directory for type declarations.
- Removed vite.config.ts as it is no longer needed.

* fix: update TypeScript configuration path in README and package.json

* chore: update Jest installation instructions and add ts-jest as a peer dependency

* feat: update pnpm-lock.yaml with new dependencies and versions

fix: modify rollup.config.js to use tsconfig.build.json and ignore test folders

test: add unit tests for create-nextjs-eslint-config, create-nodejs-eslint-config, and create-react-eslint-config

test: implement comprehensive tests for create-eslint-config utility

chore: remove outdated verify.mjs script

chore: enhance tsconfig.build.json to exclude additional test directories

chore: adjust tsconfig.json moduleResolution to Node

* chore(release): 1.7.0-rc.1 [skip ci]

# [1.7.0-rc.1](https://github.com/pixpilot/dev-config/compare/v1.6.2-rc.1...v1.7.0-rc.1) (2025-07-15)

### Bug Fixes

* update TypeScript configuration path in README and package.json ([de3e17b](https://github.com/pixpilot/dev-config/commit/de3e17bdec8175e67ab54de19a92147478753f3b))

### Features

* update pnpm-lock.yaml with new dependencies and versions ([7ea5300](https://github.com/pixpilot/dev-config/commit/7ea5300f154057506e36463ab26ba81c62f2715f))

# [1.7.0-rc.1](https://github.com/pixpilot/dev-config/compare/v1.6.2-rc.1...v1.7.0-rc.1) (2025-07-15)


### Bug Fixes

* update TypeScript configuration path in README and package.json ([de3e17b](https://github.com/pixpilot/dev-config/commit/de3e17bdec8175e67ab54de19a92147478753f3b))


### Features

* update pnpm-lock.yaml with new dependencies and versions ([7ea5300](https://github.com/pixpilot/dev-config/commit/7ea5300f154057506e36463ab26ba81c62f2715f))

## [1.6.2-rc.1](https://github.com/pixpilot/dev-config/compare/v1.6.1...v1.6.2-rc.1) (2025-07-14)

## [1.6.2](https://github.com/pixpilot/dev-config/compare/v1.6.1...v1.6.2) (2025-07-13)

### Bug Fixes

* update Prettier configuration and streamline tsconfig exclusion list ([5ff470f](https://github.com/pixpilot/dev-config/commit/5ff470fe3b6f5785028f551e6203c5c1d9f19455))

## [1.6.1](https://github.com/pixpilot/dev-config/compare/v1.6.0...v1.6.1) (2025-07-13)


### Bug Fixes

* remove accessibility config from ESLint setup for React ([00caa83](https://github.com/pixpilot/dev-config/commit/00caa83e4c8d3aff0606db78f679014fe75c1966))

# [1.6.0](https://github.com/pixpilot/dev-config/compare/v1.5.2...v1.6.0) (2025-07-13)


### Features

* add support for Next.js ESLint plugin and update documentation ([ed074fc](https://github.com/pixpilot/dev-config/commit/ed074fcb2e19a258f10e5b7019db33ecd3c6e099))

## [1.5.2](https://github.com/pixpilot/dev-config/compare/v1.5.1...v1.5.2) (2025-07-13)


### Bug Fixes

* update README formatting for installation instructions ([e832f22](https://github.com/pixpilot/dev-config/commit/e832f223b000da4afbd37de7db1d4bc2ce299be7))

## [1.5.1](https://github.com/pixpilot/dev-config/compare/v1.5.0...v1.5.1) (2025-07-13)


### Bug Fixes

* deps ([361411b](https://github.com/pixpilot/dev-config/commit/361411b3ee17bb4eb3c7ce9cdacaaec97df65dc8))

# [1.5.0](https://github.com/pixpilot/dev-config/compare/v1.4.7...v1.5.0) (2025-07-13)


### Bug Fixes

* update lock file ([dec4e7c](https://github.com/pixpilot/dev-config/commit/dec4e7c3991fb04c837822d472167b235c3ceba8))


### Features

* update ESLint configurations and add accessibility support ([82d1ed9](https://github.com/pixpilot/dev-config/commit/82d1ed9897cfac2824fe8dcf12cb747a26cc690e))

## [1.4.7](https://github.com/pixpilot/dev-config/compare/v1.4.6...v1.4.7) (2025-07-12)


### Bug Fixes

* trigger semantic-release ([79eaa47](https://github.com/pixpilot/dev-config/commit/79eaa471671a93bfe2a1b92d6b19b502644ebdcf))

## [1.4.7-rc.1](https://github.com/pixpilot/dev-config/compare/v1.4.6...v1.4.7-rc.1) (2025-07-12)


### Bug Fixes

* remove unused import resolution settings from ESLint Jest config ([bd9135c](https://github.com/pixpilot/dev-config/commit/bd9135c758ffbd1167b370c547ae5dcdad014618))

## [1.4.6](https://github.com/pixpilot/dev-config/compare/v1.4.5...v1.4.6) (2025-07-12)


### Bug Fixes

* update create-github-app-token action to version 2 ([83e97c5](https://github.com/pixpilot/dev-config/commit/83e97c5306884aa418eec28377664fd2ab3f85f0))

## [1.4.5](https://github.com/pixpilot/dev-config/compare/v1.4.4...v1.4.5) (2025-07-12)


### Bug Fixes

* update dependencies for @eslint/js, @types/node, @typescript-eslint/utils, jest, prettier, and semantic-release ([a172987](https://github.com/pixpilot/dev-config/commit/a17298753767a8d20e60d926b0a681db814989e7))

## [1.4.4](https://github.com/pixpilot/dev-config/compare/v1.4.3...v1.4.4) (2025-07-12)


### Bug Fixes

* update @eslint/compat dependency to version 1.3.1 ([cf6bbbe](https://github.com/pixpilot/dev-config/commit/cf6bbbee0319ff4f98157120c08d83f0f9fdf2a1))

## [1.4.4-rc.2](https://github.com/pixpilot/dev-config/compare/v1.4.4-rc.1...v1.4.4-rc.2) (2025-07-11)


### Bug Fixes

* update CodeQL analysis to use extended security query set ([3c98f25](https://github.com/pixpilot/dev-config/commit/3c98f253476bee21e2bbdc9c4ceffa7ae7c9b4bc))

## [1.4.4-rc.1](https://github.com/pixpilot/dev-config/compare/v1.4.3...v1.4.4-rc.1) (2025-07-11)


### Bug Fixes

* update permissions to allow writing issues in CodeQL workflow ([39e1c67](https://github.com/pixpilot/dev-config/commit/39e1c67d3377817af9e55c2ea56999099cb1abcc))

## [1.4.3](https://github.com/pixpilot/dev-config/compare/v1.4.2...v1.4.3) (2025-07-11)


### Bug Fixes

* **docs:** clarify dependency requirements for ESLint + Jest and Jest sections ([39467b1](https://github.com/pixpilot/dev-config/commit/39467b11c314594857336803562cd2d86e0ef4df))
* **lint:** rename markdownlint commands for README.md to improve clarity ([281e26d](https://github.com/pixpilot/dev-config/commit/281e26d8d6259024c7142bb2d9ca8c953171ce84))
* **lint:** update markdownlint command for fixing README.md ([d535a42](https://github.com/pixpilot/dev-config/commit/d535a42eb2bde09223315fd2dc8f5e3d24ed6a67))
* **lint:** update markdownlint command to apply fixes to all markdown files excluding CHANGELOG.md ([425bba5](https://github.com/pixpilot/dev-config/commit/425bba53580ae7bed810b4e3212487404d0560e6))
* **lint:** update markdownlint command to lint only README.md and exclude CHANGELOG.md ([debe977](https://github.com/pixpilot/dev-config/commit/debe9775e9e8a7f699b9cd706bbf02831b7b2e05))
* **markdownlint:** disable whitespace rule in markdownlint configuration ([e9481a9](https://github.com/pixpilot/dev-config/commit/e9481a9cb7bbe54d3e8bfe589b05f370ca4cac2e))
* **release:** force patch ([a4b3814](https://github.com/pixpilot/dev-config/commit/a4b38145f3b429315efdcdd05257406bbbfaf9ea))

## [1.4.2](https://github.com/pixpilot/dev-config/compare/v1.4.1...v1.4.2) (2025-07-11)


### Bug Fixes

* simplify markdownlint commands in package.json ([72d17a0](https://github.com/pixpilot/dev-config/commit/72d17a0829a6b74379f2510fb1f4d626784b439e))

## [1.4.1](https://github.com/pixpilot/dev-config/compare/v1.4.0...v1.4.1) (2025-07-11)


### Bug Fixes

* update markdownlint configuration to set line length to 120 ([c384fc1](https://github.com/pixpilot/dev-config/commit/c384fc1cc4c53fa4729db24ae36ac703c96178b0))

# [1.4.0](https://github.com/pixpilot/dev-config/compare/v1.3.0...v1.4.0) (2025-07-11)


### Features

* Add markdownlint configuration file with line length rule ([acae5da](https://github.com/pixpilot/dev-config/commit/acae5dab7a90e41b38090cfbdfd5393d9fcb087a))

# [1.3.0](https://github.com/pixpilot/dev-config/compare/v1.2.0...v1.3.0) (2025-07-10)


### Features

* add reusable CodeQL issue maker workflow ([a76eab3](https://github.com/pixpilot/dev-config/commit/a76eab3ace3df0ea12986335feedd1869c1b8c7e))

# [1.2.0](https://github.com/pixpilot/dev-config/compare/v1.1.7...v1.2.0) (2025-07-09)


### Bug Fixes

* add 'next' branch to push trigger for CodeQL analysis ([89853fe](https://github.com/pixpilot/dev-config/commit/89853feed4be3535a87e406b3fb3cf0ee82e1e84))
* uncomment configuration for CodeQL analysis job ([38ca007](https://github.com/pixpilot/dev-config/commit/38ca0072020e0664b316186521ce539dbd24b09a))
* update branch filters in CI and release workflows to include 'master' and 'next' ([cb2d02d](https://github.com/pixpilot/dev-config/commit/cb2d02dc06ea3c0089ca36820da31f027609aa8a))


### Features

* add CodeQL configuration and reusable workflow for code analysis ([57e2ca3](https://github.com/pixpilot/dev-config/commit/57e2ca3b1e7c44461ad3fcdc977cf44d791b302a))

# [1.2.0-rc.1](https://github.com/pixpilot/dev-config/compare/v1.1.6...v1.2.0-rc.1) (2025-07-09)

### Bug Fixes

* update branch filters in CI and release workflows to include 'master' and 'next' ([cb2d02d](https://github.com/pixpilot/dev-config/commit/cb2d02dc06ea3c0089ca36820da31f027609aa8a))
* update testMatch pattern in Jest configuration ([a8fcfae](https://github.com/pixpilot/dev-config/commit/a8fcfae10725df18981b1e3e64e99fec63448ffa))

### Features

* add CodeQL configuration and reusable workflow for code analysis ([57e2ca3](https://github.com/pixpilot/dev-config/commit/57e2ca3b1e7c44461ad3fcdc977cf44d791b302a))

## [1.1.7](https://github.com/pixpilot/dev-config/compare/v1.1.6...v1.1.7) (2025-07-04)

### Bug Fixes

* update testMatch pattern in Jest configuration ([a8fcfae](https://github.com/pixpilot/dev-config/commit/a8fcfae10725df18981b1e3e64e99fec63448ffa))

## [1.1.6](https://github.com/pixpilot/dev-config/compare/v1.1.5...v1.1.6) (2025-07-02)

### Bug Fixes

* correct formatting of usage instructions in semantic-release workflow ([8c471c8](https://github.com/pixpilot/dev-config/commit/8c471c87f3cab3a32f4c30b54d5fa00e360eba97))

## [1.0.2](https://github.com/pixpilot/dev-config/compare/v1.0.1...v1.0.2) (2025-07-02)

### Bug Fixes

* update README to include semantic release workflow instructions ([4ea8f19](https://github.com/pixpilot/dev-config/commit/4ea8f197726a21f45cbc22dd5caf91ab7d105645))

# 1.0.0 (2025-07-02)

### Bug Fixes

* simplify release workflow by reusing semantic-release steps ([ef3556b](https://github.com/pixpilot/dev-config/commit/ef3556b8e479f35b54e8102f592e35f59901c3de))
