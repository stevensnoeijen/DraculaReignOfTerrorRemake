/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript',
  ],
  plugins: ['import'],
  rules: {
    'max-len': ['warn', { code: 80, ignorePattern: '^import\\W.*' }],
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    'import/order': ['warn'],
    'spaced-comment': ['warn', 'always'],
  },
};
