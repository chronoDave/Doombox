module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true
  },
  extends: ['airbnb', 'airbnb/hooks'],
  settings: {
    'import/core-modules': ['electron', 'chai']
  },
  rules: {
    // General
    'operator-linebreak': ['error', 'after'],
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    'arrow-body-style': 'warn',
    'arrow-parens': ['error', 'as-needed'],
    'object-curly-newline': 'off',
    'no-await-in-loop': 'off',
    // React
    'react/jsx-fragments': 'off', // Prefer verbose syntax
    'react/jsx-props-no-spreading': 'off', // Spread appropriatly
    // Import
    'import/prefer-default-export': 'off'
  }
};
