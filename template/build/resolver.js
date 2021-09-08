const fs = require('fs')
const path = require('path')
const resolve = require('resolve')

function mapModuleFieldToMain (pkg, pkgDir) {
  const moduleSrcPath = pkg.module
  const isModuleFieldAvailable = moduleSrcPath &&
      fs.existsSync(path.resolve(pkgDir, moduleSrcPath))

  if (isModuleFieldAvailable) {
    return Object.assign({ }, pkg, { main: moduleSrcPath })
  }
  return pkg
}

function defaultResolver (pathStr, options) {
  return resolve.sync(pathStr, {
    basedir: options.basedir,
    extensions: options.extensions,
    moduleDirectory: options.moduleDirectory,
    paths: options.paths,
    packageFilter: mapModuleFieldToMain
  })
}

module.exports = defaultResolver
