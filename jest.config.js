module.exports = {
  bail: 1,
  verbose: true,
  testEnvironment: 'jsdom',
  testURL: 'https://jest.test',
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['<rootDir>/packages/**/test/**/*.test.{js,ts}'],
  collectCoverageFrom: [
    '<rootDir>/packages/**/*.{js,ts}',
    '!**/test/**'
  ],
  snapshotSerializers: ['miniprogram-simulate/jest-snapshot-plugin']
}
