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
