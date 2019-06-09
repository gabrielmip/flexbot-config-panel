module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "6",
    jsx: true
  },
  plugins: [
    '@typescript-eslint',
    'react'
  ],
  rules: {
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    'space-before-function-paren': 'warn',
    'jsx-quotes': ['warn', 'prefer-single'],
    'quotes': ['warn', 'single', { 'avoidEscape': true }]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}