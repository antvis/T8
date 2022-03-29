const base = require('./config/jest.js');

module.exports = {
  ...base,
  projects: ['<rootDir>/packages/*/jest.config.js'],
  coverageDirectory: '<rootDir>/coverage/',
};
