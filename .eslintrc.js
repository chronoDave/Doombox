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
      'chai-as-promised',
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
    'no-underscore-dangle': 'off', // NeDB _id
    // React
    'react/jsx-fragments': 'off', // Prefer verbose syntax
    'react/jsx-props-no-spreading': 'off', // Spread appropriatly
    // Import
    'import/prefer-default-export': 'off'
  }
};
