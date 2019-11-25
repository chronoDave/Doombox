module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true
  },
  extends: [
    'airbnb',
    "plugin:react/recommended",
    'plugin:import/recommended',
    "plugin:mocha/recommended"
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module'
  },
  plugins: [
    'react-hooks',
    'react-i18next',
    'mocha'
  ],
  settings: {
    'import/core-modules': [
      'electron',
      'spectron',
      'chai',
      'chai-as-promised'
    ]
  },
  rules: {
    // General
    'operator-linebreak': ['error', 'after'],
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    'arrow-body-style': 'warn',
    'arrow-parens': ['error', 'as-needed'],
    'no-nested-ternary': 'off',
    "no-underscore-dangle": ['error', { 'allow': ['_id']}], // Database _id property
    // Import
    'import/namespace': ['error', { 'allowComputed': true }],
    'import/prefer-default-export': 'off',
    // JSX
    'jsx-a11y/label-has-for': 'off', // This rule was deprecated in v6.1.0.
    // Mocha
    'mocha/no-mocha-arrows': 'off' // Mocha context isn't used
  }
}