const ERROR_LEVEL = 2;
const HEADER_MAX_LENGTH = 100;
const SUBJECT_MAX_LENGTH = 100;
const BODY_MAX_LINE_LENGTH = 120;

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Allow any subject case
    'subject-case': [0, 'never'],
    // Enforce allowed commit types (error if invalid)
    'type-enum': [
      ERROR_LEVEL, // Enforce as error
      'always',
      [
        'feat', // New features
        'fix', // Bug fixes
        'docs', // Documentation changes
        'chore', // Maintenance tasks (build process, dependencies, etc.)
        'refactor', // Code refactoring (no feature or bug fix)
        'test', // Adding or updating tests
        'ci', // CI/CD configuration or scripts
        'perf', // Performance improvements
        'style', // Code style/formatting (white-space, formatting, missing semi-colons, etc.)
        'build', // Build system or external dependencies changes
        'revert', // Reverting previous commits
        'merge', // Merging branches
      ],
    ],
    // Limit subject line length
    'subject-max-length': [ERROR_LEVEL, 'always', SUBJECT_MAX_LENGTH],
    // Limit header line length
    'header-max-length': [ERROR_LEVEL, 'always', HEADER_MAX_LENGTH],
    // Limit body line length
    'body-max-line-length': [1, 'always', BODY_MAX_LINE_LENGTH],
  },
};
