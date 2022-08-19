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
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
  ],
  parser: 'vue-eslint-parser',
  plugins: ['import', 'unused-imports', '@typescript-eslint'],
  rules: {
    'max-len': ['warn', { code: 80, ignorePattern: '^import\\W.*' }],
    quotes: ['warn', 'single', { avoidEscape: true }],
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
    '@typescript-eslint/ban-ts-comment': ['error'],
  },
  ignorePatterns: ['components.d.ts'],
  overrides: [
    {
      files: ['**/*.spec.ts'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: {
        'jest/no-mocks-import': ['off'],
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
