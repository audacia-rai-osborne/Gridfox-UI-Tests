module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint',
    'no-only-tests',
  ],
  env: {
    'cypress/globals': true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:cypress/recommended',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  rules: {
    'no-unused-vars': 'off',
    'no-only-tests/no-only-tests': 'error',
    'linebreak-style': ['error', 'windows'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'max-len': ['warn', {
      code: 100,
      ignoreComments: true,
      ignoreStrings: true,
    }],
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'import/order': ['warn', {
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
      },
    }],
  },
};
