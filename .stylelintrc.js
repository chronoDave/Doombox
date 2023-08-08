module.exports = {
  extends: 'stylelint-config-standard-scss',
  rules: {
    'color-named': 'never',
    'selector-class-pattern': null,
    'declaration-no-important': true,
    'hue-degree-notation': 'number',
    'property-no-vendor-prefix': [true, {
      ignoreProperties: [
        'appearance'
      ]
    }],
    'declaration-empty-line-before': null,
    'at-rule-empty-line-before': null,
    'function-name-case': null,
    'selector-type-case': 'lower',
    'value-keyword-case': 'lower',
    'import-notation': 'string',
    // SCSS
    'scss/double-slash-comment-empty-line-before': null,
    'scss/dollar-variable-empty-line-before': null,
    'scss/at-import-no-partial-leading-underscore': true,
    'scss/at-import-partial-extension': 'never',
    'scss/at-function-pattern': null
  }
}