module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|js)$': '@swc/jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  setupFiles: ['jest-webgl-canvas-mock'],
  testRegex: '((\\.|/)spec)\\.ts?$',
  reporters: ['default', 'jest-junit'],
};
