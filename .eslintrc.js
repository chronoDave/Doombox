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
    // Import
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off' // Electron builder requires devDependency
  }
}