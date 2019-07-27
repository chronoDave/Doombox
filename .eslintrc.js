module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: [
    'plugin:import/recommended',
    'airbnb'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module'
  },
  plugins: [
    'react-hooks',
    'react-i18next'
  ],
  rules: {
    // General
    'operator-linebreak': ["error", "after"],
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    'arrow-body-style': 'warn',
    "arrow-parens": ["error", "as-needed"],
    "no-underscore-dangle": "off", // Mongoose _doc
    "camelcase": "off", // Mongoose data types
    "no-nested-ternary": "off",
    // React
    "react/jsx-no-duplicate-props": ["warn", { "ignoreCase": false }], // MUI inputProps / InputProps
    "react/forbid-prop-types": "off", // Most packages don't have shapes,
    "react/jsx-closing-bracket-location": "off", // Prefer not to use newline on single-prop JSX
    // Import
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off', // Electron builder requires devDependency
    // JSX
    'jsx-a11y/label-has-for': 'off' // This rule was deprecated in v6.1.0.
  }
}