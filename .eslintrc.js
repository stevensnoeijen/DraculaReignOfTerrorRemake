/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  env: {
    browser: true,
    node: true,
  },
  globals: {
    document: false,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript',
  ],
  plugins: ['import', 'unused-imports'],
  rules: {
    'max-len': ['warn', { code: 80, ignorePattern: '^import\\W.*' }],
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
      },
    ],
    'spaced-comment': ['warn', 'always'],
    'unused-imports/no-unused-imports': 'warn',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'no-warning-comments': ['warn'],
  },
};
