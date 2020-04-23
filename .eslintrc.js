module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true
  },
  settings: {
    'import/core-modules': [
      'electron',
      'tap',
      'chai',
      'chai-as-promised'
    ]
  },
  extends: [
    'airbnb',
    'airbnb/hooks'
  ],
  rules: {
    // General
    'operator-linebreak': ['error', 'after'],
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    'arrow-body-style': 'warn',
    'arrow-parens': ['error', 'as-needed'],
    'no-nested-ternary': 'off',
    'class-methods-use-this': 'off', // No support for private methods yet
    'no-underscore-dangle': ['error', { 'allow': ['_id']}], // Database _id property
    'no-await-in-loop': 'warn', // Allow async actions to be ran synchronous in series
    'no-restricted-syntax': 'off', // For loop allow async sync series
    // Import
    'import/namespace': ['error', { 'allowComputed': true }],
    'import/prefer-default-export': 'off',
    // React
    'react/jsx-fragments': 'off', // Prefer <Fragment />
    'react/jsx-props-no-spreading': 'off', // Prefer spread operator
    // JSX
    'jsx-a11y/label-has-for': 'off', // This rule was deprecated in v6.1.0.
    // Mocha
    'mocha/no-mocha-arrows': 'off' // Mocha context isn't used
  }
}