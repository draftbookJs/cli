module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  overrides: [
    {
      files: 'test/**/*.*',
      env: {
        'jest/globals': true
      },
      plugins: ['jest']
    }
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  }
}
