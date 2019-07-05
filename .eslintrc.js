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
  plugins: ['react-hooks'],
  rules: {
    // General
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    'arrow-body-style': 'warn',
    "arrow-parens": ["error", "as-needed"],
    "no-underscore-dangle": "off", // Mongoose _doc
    "camelcase": "off", // Mongoose data types
    // Import
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off' // Electron builder requires devDependency
  }
}