module.exports = {
  preset: 'ts-jest',
  runner: '@jest-runner/electron',
  testEnvironment: '@jest-runner/electron/environment',
  setupFiles: ['./dist/index.js'],
};
