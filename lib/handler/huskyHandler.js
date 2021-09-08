
const { getFile } = require('../utils.js')

exports.huskyHandler = (allFiles, { husky, eslint }) => {
  if (husky === true) {
    const packageItem = getFile(allFiles, 'package.json')
    const parsedPackage = JSON.parse(packageItem.file)

    parsedPackage.scripts.prepare = 'husky install && npx husky add .husky/pre-commit "npx lint-staged"'
    parsedPackage.devDependencies['lint-staged'] = '^10.5.4'
    parsedPackage.devDependencies.husky = '^6.0.0'
    const lintStage = {}
    if (eslint) {
      lintStage['src/**/*.*'] = [
        'eslint --fix'
      ]
    }
    parsedPackage['lint-staged'] = lintStage
    packageItem.file = JSON.stringify(parsedPackage)
  }
}
