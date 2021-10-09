const base = require('../../jest.config.base.js');

module.exports = {
  ...base,
  name: 'narrative-text-vis',
  displayName: 'narrative-text-vis',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
  },
};
