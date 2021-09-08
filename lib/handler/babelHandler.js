
const $ = require('gogocode')
const { getFile } = require('../utils.js')

exports.babelHandler = (allFiles, { babel }) => {
  if (babel !== 'ignore') {
    const rollupConfig = getFile(allFiles, 'rollup.config.js')
    const onlySyntax = `{
      ...base,
      output: { ...output(ES_ONLY_CONVERTED_SYNTAX), format: FORMAT.ES },
      plugins: plugins(ES_ONLY_CONVERTED_SYNTAX)
    }`

    rollupConfig.file = $(rollupConfig.file)
      .find('const FORMAT = $_$')
      .before('const ES_ONLY_CONVERTED_SYNTAX = \'es-only-converted-syntax\'')
      .root()

      .find('babel($_$)')
      .replace('babelHelpers: $_$', 'babelHelpers: format === ES_ONLY_CONVERTED_SYNTAX ? $_$ : \'runtime\'')
      .root()

      .find('const base = $_$')
      .replace('external: [$$$]', 'external: [$$$, /@babel/]')
      .root()

      .replace('export default $_$', `export default process.env.POLYFILL_MODE === 'onlySyntax'\n  ? ${onlySyntax}\n:  $_$`)
      .root()

      .generate()

    const babelConfig = getFile(allFiles, 'babel.config.js')
    const plugins = `plugins: process.env.POLYFILL_MODE === 'onlySyntax' 
    ? []
    : [
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: 3
          }
        ]
      ]`

    babelConfig.file = $(babelConfig.file)
      .find('presets: $_$')
      .after(plugins)
      .root()

      .generate()

    const packageItem = getFile(allFiles, 'package.json')
    const parsedPackage = JSON.parse(packageItem.file)

    if (babel === 'runtime') {
      parsedPackage.dependencies['@babel/runtime-corejs3'] = '^7.0.0'
    } else {
      parsedPackage.devDependencies['@babel/runtime-corejs3'] = '^7.0.0'
      parsedPackage.peerDependencies['@babel/runtime-corejs3'] = '^7.0.0'
    }

    parsedPackage.devDependencies['@babel/plugin-transform-runtime'] = '^7.14.5'
    parsedPackage
      .scripts['build:onlySytnax'] = 'cross-env POLYFILL_MODE=onlySyntax rollup -c build/rollup.config.js'
    parsedPackage.scripts.build += ' && npm run build:onlySytnax'

    packageItem.file = JSON.stringify(parsedPackage)
  }
}
