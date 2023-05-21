module.exports = {
  extends: 'stylelint-config-standard-scss',
  rules: {
    // SCSS
    'scss/double-slash-comment-empty-line-before': null,
    'scss/dollar-variable-empty-line-before': null,
    // Conventions
    'color-named': 'never',
    'selector-class-pattern': null,
    'declaration-no-important': true,
    'property-no-vendor-prefix': [true, {
      ignoreProperties: [
        'appearance'
      ]
    }],
    'function-name-case': 'lower',
    'selector-type-case': 'lower',
    'value-keyword-case': 'lower',
    'import-notation': 'string'
  }
}