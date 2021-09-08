module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard'],
  overrides: [{
    files: 'test/**/*.*',
    env: {
      'jest/globals': true
    },
    plugins: ['jest']
  }],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {}
}
