const fs = require('fs')
const path = require('path')

function getExt (ext, { typescript }) {
  if (ext === '.ts' && !typescript) {
    return '.js'
  }
  return ext
}

function readGitignore (pathValue) {
  const gitignorePath = path.resolve(pathValue, '.gitignore')
  if (fs.existsSync(gitignorePath)) {
    const gitignore = fs.readFileSync(gitignorePath, { encoding: 'utf-8' })
    return [...gitignore.split('\n'), 'package-lock.json']
  }
  return []
}

function readFiles (pathValue, gitignore) {
  const parsedPath = path.parse(pathValue)
  const isDirectory = fs.statSync(pathValue).isDirectory()
  if (isDirectory) {
    return {
      ...parsedPath,
      path: pathValue,
      file: fs.readdirSync(pathValue)
        .filter(item => {
          return !gitignore.includes(item)
        })
        .map(item => {
          return readFiles(path.resolve(pathValue, item), gitignore)
        }),
      isDirectory: true
    }
  }
  return {
    ...parsedPath,
    path: pathValue,
    file: fs.readFileSync(pathValue, { encoding: 'utf-8' })
  }
}

function writeFiles ({ currentFiles, pathValue, answers }) {
  currentFiles.forEach(({
    isDirectory, isDelete, file, name, ext
  }) => {
    const filePathValue = path.resolve(pathValue, name)
    if (isDirectory) {
      if (fs.existsSync(filePathValue)) {
        console.log(`${filePathValue} has exists!,\nPlease remove the dir first`)
      } else {
        fs.mkdirSync(filePathValue)
        writeFiles({ currentFiles: file, pathValue: filePathValue, answers })
      }
    } else if (!isDelete) {
      fs.writeFileSync(
        filePathValue + getExt(ext, answers),
        file
      )
    }
  })
}

function getFile (files, name) {
  let result
  files.forEach(item => {
    if (result) {
      return
    }
    const { file, isDirectory, ext } = item
    if (isDirectory) {
      result = getFile(file, name)
    } else if (item.name + ext === name) {
      result = item
    }
  })
  return result
}

module.exports = {
  readGitignore,
  readFiles,
  writeFiles,
  getFile
}
