import { resolve } from 'path'
import { babel } from '@rollup/plugin-babel' // https://github.com/rollup/plugins/tree/master/packages/babel#readme
import { nodeResolve } from '@rollup/plugin-node-resolve' // https://github.com/rollup/plugins/tree/master/packages/node-resolve
import commonjs from '@rollup/plugin-commonjs' // https://github.com/rollup/plugins/tree/master/packages/commonjs
import typescript from '@rollup/plugin-typescript' // https://github.com/rollup/plugins/tree/master/packages/typescript

import { name, dependencies, peerDependencies } from '../package.json'

const FORMAT = {
  ES: 'es',
  CJS: 'cjs',
  UMD: 'umd'
}

const extensions = ['.js', '.ts']

const base = {
  input: resolve(__dirname, '../src/index.ts'),
  external: [...Object.keys({
    ...dependencies,
    ...peerDependencies
  })] // https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
}
const output = format => {
  return {
    name,
    dir: resolve(__dirname, `../dist/${format}`),
    format,
    globals: {} // peerDependencies 专用，如果没有无需设置
  }
}

const typescriptOptions = {
  tsconfig: resolve(__dirname, '../tsconfig.rollup.json'),
  declaration: true,
  declarationDir: resolve(__dirname, '../dist/es/types')
}

const plugins = format => {
  return [
    nodeResolve({ extensions }),
    commonjs(),
    babel({ extensions, exclude: ['node_modules/**'], babelHelpers: 'bundled' }),
    typescript(format === FORMAT.ES ? typescriptOptions : {})
  ]
}

// 开发模式
const devServer = [
  {
    ...base,
    output: output(FORMAT.ES),
    plugins: [
      commonjs({}),
      typescript(typescriptOptions)
    ]
  }
]
const developmentMode = process.env.ROLLUP_ENV === 'development'

const result = developmentMode
  ? devServer
  : [
      {
        ...base,
        output: output(FORMAT.ES),
        plugins: plugins(FORMAT.ES)
      },
      {
        ...base,
        output: output(FORMAT.CJS),
        plugins: plugins(FORMAT.CJS)
      },
      {
        ...base,
        output: output(FORMAT.UMD),
        plugins: plugins(FORMAT.UMD),
        external: [...Object.keys({ ...peerDependencies })]
      }
    ]

export default result
