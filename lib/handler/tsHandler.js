const $ = require('gogocode')
const { getFile } = require('../utils.js')

exports.tsHandler = (allFiles, { typescript }) => {
  if (typescript === false) {
    const rollupConfig = getFile(allFiles, 'rollup.config.js')
    rollupConfig.file = $(rollupConfig.file)
      .replace('input: resolve($_$1, $_$2)', 'input: resolve($_$1, \'../src/index.js\')')
      .remove('import typescript from \'$_$\'')
      .remove('const typescriptOptions = $_$')
      .remove('typescript($_$)')
      .generate()

    const jestConfig = getFile(allFiles, 'jest.config.js')
    jestConfig.file = $(jestConfig.file)
      .replace('setupFiles: [\'./test/setup.ts\']', 'setupFiles: [\'./test/setup.js\']')
      .remove('preset: \'ts-jest/presets/js-with-ts-esm\'')
      .generate()

    const tsconfig = getFile(allFiles, 'tsconfig.json')
    tsconfig.isDelete = true
    const tsconfigRollup = getFile(allFiles, 'tsconfig.rollup.json')
    tsconfigRollup.isDelete = true

    const eslintrc = getFile(allFiles, '.eslintrc.js')
    eslintrc.file = $(eslintrc.file)
      .replace('\'extends\': [$$$, \'@ecomfe/eslint-config/typescript/strict\']', '\'extends\': [$$$]')
      .remove('\'parser\': \'@typescript-eslint/parser\'')
      .generate()

    const packageItem = getFile(allFiles, 'package.json')
    const parsedPackage = JSON.parse(packageItem.file)

    delete parsedPackage.types
    delete parsedPackage.devDependencies['@rollup/plugin-typescript']
    delete parsedPackage.devDependencies['@typescript-eslint/parser']
    delete parsedPackage.devDependencies['@typescript-eslint/eslint-plugin']
    delete parsedPackage.devDependencies['@types/jest']
    delete parsedPackage.devDependencies['ts-jest']
    delete parsedPackage.devDependencies.typescript
    delete parsedPackage.devDependencies.tslib

    packageItem.file = JSON.stringify(parsedPackage)
  }
}
