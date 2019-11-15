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
    "mocha"
  ],
  settings: {
    'import/core-modules': [
      'electron',
      'redux-logger',
      'chai',
      'yup',
      'shortid'
    ]
  },
  rules: {
    // General
    'operator-linebreak': ['error', 'after'],
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    'arrow-body-style': 'warn',
    'arrow-parens': ['error', 'as-needed'],
    'no-underscore-dangle': 'off', // Mongoose _doc
    'camelcase': 'off', // Mongoose data types
    'no-nested-ternary': 'off',
    'prefer-promise-reject-errors': 'off',
    "no-constant-condition": ["error", { "checkLoops": false }],
    // Advanced
    'no-bitwise': ["error", { "allow": ['|', '>>', '<<', '&'] }], // MP3 metadata parser
    'no-control-regex': "off", // MP3 metadata parser
    // React
    'react/jsx-no-duplicate-props': ['warn', { 'ignoreCase': false }], // MUI inputProps / InputProps
    'react/display-name': 'off', // Gives false-positive on Routes
    // Import
    'import/namespace': ['error', { 'allowComputed': true }],
    'import/prefer-default-export': 'off',
    // JSX
    'jsx-a11y/label-has-for': 'off', // This rule was deprecated in v6.1.0.
    // Mocha
    'mocha/no-mocha-arrows': 'off' // We don't need Mocha context
  }
}