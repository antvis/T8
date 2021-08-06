module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: false,
  collectCoverageFrom: ['packages/**/src/**/*.ts'],
  testRegex: '(/__tests__/.*\\.(test|spec))\\.ts$',
  verbose: false,
};
