module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['json', 'lcov'],
  collectCoverageFrom: ['**/src/**'],
  testMatch: ['**/__tests__/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
}
