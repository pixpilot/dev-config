## **General Guidelines**

- **Package Manager**: Only use `pnpm` for installing or managing dependencies within this project's actual source code. However, for all `README.md` and other documentation files, always use `npm` commands (`npm install -D ...`) for user-facing examples.
- **File Naming**: When creating a new configuration, the file name in the repository must correspond to the entry point specified in the documentation (e.g., a config for `eslint-foo` would be located at `eslint-foo.js` and accessed via `@pixpilot/dev-config/eslint-foo`).
