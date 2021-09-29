# @draftbook/cli - SDK 脚手架

![license](https://img.shields.io/npm/l/@draftbook/cli?style=for-the-badge)

Command Line Interface for SDK

## Installation

```javascript
$ npm install -g @draftbook/cli
```

## Usage

在当前目录下创建一个基于 rollup 配置的项目。代码中预置了常用基础配置和最佳实践，适用于 sdk 开发

```bash
draftbook add
```

## Command

目前仅提供新建 sdk 命令

```bash
Usage: draftbook [options] [command]

Options:
  -v, --version   output the current version
  -h, --help      display help for command

Commands:
  add             create a new sdk in current dir
  help [command]  display help for command
```

## Detail

创建新 SDK 时，选项说明

### 1. What's your SDK name? (my-sdk) 
sdk 名称，采用小写字母 + `'-'` 的形式

### 2. Select a template (Use arrow keys)
- fast-start
- custom

选择预设模板
- fast-start：常用的 sdk 初始化配置，使用 @babel/runtime 处理 api，引入 eslint、husky。可以自行选择使用使用 typescript
- custom：自定义后续规则

### 3. How to convert API to backward-compatible versions with Babel
>  API: Promise、[].includes ...
>
>  Syntax: {...obj}, ()=>{}, const ...
>
>  Either way, it will transform Syntax

- ignore (Consumer has converted API with @babel/polyfill) 
- dependencies @babel/runtime (Consumers didn't convert API) 
- peerDependencies @babel/runtime (Consumer has converted API with @babel/runtime)

如何使用 Babel 将 API 转换为向后兼容的版本。首先要知道的是，兼容问题分为两部分

- API：可以在代码运行时被兼容的，例如 Promise、[].includes 等
- Syntax：运行时不能被兼容的，例如箭头函数、const 等

无论使用哪种配置，sdk 一定会处理 Syntax。而对于 api
- 如果能确认调用方已经处理过了，可以选择不处理，减小 sdk 体积
- 如果无法确认调用方会不会处理，可以选择用 @babel/runtime 处理
- 如果确认调用方是通过 @babel/runtime 来处理的，可以把该依赖设置为同级依赖，一样可以减小 sdk 体积

后两种方式 build 时会额外生成一个 `dist/es-only-converted-syntax` 文件， 不做 api 处理，可以特殊使用，减小最终的代码体积

### 4. Use Typescript (Y/n) 
是否使用 TypeScript（推荐使用）

### 5. Choice a framework (Look out for vue and react) (Use arrow keys)
- none 

选择 SDK 框架。目前只支持 js，后续增加 vue、react

### 6. Use EsLint (y/N)
是否需要配置 Eslint，用于代风格校验

### 7. Use Husky (y/N)
是否需要配置 Husky，用于 git commit 前的代码校验

## Script

新生成的代码预置了如下 script。规范流程的同时提高开发效率

### 1. build

打包代码

### 2. dev

开发模式。修改源码保存后，实时生成 dist 文件

### 3. prepatch

打包并发布测试版代码。例如当前代码版本是 `1.0.1`

执行代码之后

```bash
npm run prepatch 
```

会自动打包、修改代码版本到：`1.0.2-alpha.0`、然后发布代码

在 alpha 的基础上执行命令，版本会变成：`1.0.2-alpha.1`

调用方可以通过下面的命令安装测试版本代码

```bash
npm install [package name]@alpha
```

### 4. patch

打包发布正式版本代码。例如当前代码版本是 `1.0.2-alpha.1`

执行代码之后

```bash
npm run patch 
```

会自动测试、测试通过会打包、修改代码版本到：`1.0.2`、然后发布代码

在正式版基础上执行命令，版本会变成：`1.0.3`

调用方可以通过下面的命令安装正式版本代码

```bash
npm install [package name]
```

### 5. test
执行 jest 测试


## Author

> qqqqqcy@gmail.com