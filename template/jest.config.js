/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest/presets/js-with-ts-esm',

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ['./test/setup.ts'],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  // 所有匹配的文件都不会被转化，默认是 node_modules。但是如果 node_modules 中某个依赖使用了 esm 规范，是需要转化的。例如 @xxx 相关的依赖
  // transformIgnorePatterns: ['/node_modules/(?!@xxx/)'],

  // A path to a custom resolver
  // 自定义一个 resolver，优先读取依赖的 esm 入口。和 rollup 对齐
  resolver: '<rootDir>/build/resolver.js'
}
