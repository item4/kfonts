const config = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'import', 'unicorn'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
    'import/extensions': ['.js', '.cjs', '.mjs', '.ts', '.tsx'],
    'import/internal-regex': '^@/',
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description',
      },
    ],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-import-type-side-effects': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        alphabetize: {
          order: 'asc',
          orderImportKind: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['*.json'],
      rules: {},
    },
  ],
};
module.exports = config;
