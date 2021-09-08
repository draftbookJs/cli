const { getFile } = require('../utils.js')

exports.commonHandler = (allFiles, { name, eslint }) => {
  const packageItem = getFile(allFiles, 'package.json')
  const parsedPackage = JSON.parse(packageItem.file)

  parsedPackage.name = name
  parsedPackage.files = ['dist']
  packageItem.file = JSON.stringify(parsedPackage, null, 2)
}
