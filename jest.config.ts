module.exports = {
  rootDir: '.',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['json', 'lcov'],
  collectCoverageFrom: ['**/src/**'],
  testMatch: ['**/?(*.)+(spec).+(ts)'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@mock(.*)$': '<rootDir>/mock$1',
  },
}
