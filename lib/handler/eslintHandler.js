const { getFile } = require('../utils.js')

exports.eslintHandler = (allFiles, { eslint }) => {
  if (eslint === false) {
    const eslintrc = getFile(allFiles, '.eslintrc.js')
    eslintrc.isDelete = true

    const eslintignore = getFile(allFiles, '.eslintignore')
    eslintignore.isDelete = true

    const packageItem = getFile(allFiles, 'package.json')
    const parsedPackage = JSON.parse(packageItem.file)

    delete parsedPackage.scripts.eslint

    delete parsedPackage.devDependencies.eslint
    delete parsedPackage.devDependencies['eslint-config-standard']
    delete parsedPackage.devDependencies['eslint-plugin-jest']
    delete parsedPackage.devDependencies['@typescript-eslint/parser']
    delete parsedPackage.devDependencies['@typescript-eslint/eslint-plugin']

    packageItem.file = JSON.stringify(parsedPackage)
  }
}
