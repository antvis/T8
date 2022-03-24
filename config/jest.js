module.exports = {
  modulePaths: ['<rootDir>/src', '<rootDir>/__tests__'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*.(test|spec)).(jsx?|tsx?|ts?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: false,
  coveragePathIgnorePatterns: ['(tests/.*.mock).(jsx?|tsx?)$'],
  verbose: false,
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(d3-selection))'],
};
