module.exports = {
  bail: 1,
  verbose: true,
  testEnvironment: 'jsdom',
  testURL: 'https://jest.test',
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['<rootDir>/packages/**/test/**/*.spec.{js,ts}'],
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Adding this line solved the issue
    "^.+\\.tsx?$": "ts-jest"
  },
  collectCoverageFrom: [
    '<rootDir>/packages/**/*.{js,ts}',
    '!**/test/**'
  ],
  preset: "ts-jest",
  snapshotSerializers: ['miniprogram-simulate/jest-snapshot-plugin'],
}
