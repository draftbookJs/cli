
const path = require('path')
const {
  readGitignore,
  readFiles,
  writeFiles
} = require('./utils.js')
const {
  babelHandler,
  tsHandler,
  eslintHandler,
  commonHandler,
  huskyHandler
} = require('./handler/index.js')

const TEMPLATE_ROOT = path.resolve(__dirname, '../template/')

exports.newSdk = (answers) => {
  // 获取需要忽略的文件。主要用于开发环境
  const gitignore = readGitignore(TEMPLATE_ROOT)
  // read 获取模板文件
  const allFiles = [readFiles(TEMPLATE_ROOT, gitignore)]

  // handler 处理对应的配置
  babelHandler(allFiles, answers)
  tsHandler(allFiles, answers)
  eslintHandler(allFiles, answers)
  huskyHandler(allFiles, answers)
  commonHandler(allFiles, answers)

  // write 输出模板文件
  allFiles[0].name = answers.name
  writeFiles({ currentFiles: allFiles, pathValue: path.resolve(process.cwd()), answers })
}
