const inquirer = require('inquirer')
const updateNotifier = require('update-notifier')
const chalk = require('chalk')
const boxen = require('boxen')

const pkg = require('../package.json')
const { newSdk } = require('../lib/index')
const { TEMPLATE_NAME, QUESTIONS } = require('../constants')

console.log('Hi, welcome to Draftbook!')

const PRESET_TEMPLATES = {
  [TEMPLATE_NAME.FAST_START]: {
    babel: 'runtime',
    framework: 'none',
    eslint: true,
    husky: true
  },
  [TEMPLATE_NAME.CUSTOM]: {}
}

const distTag = pkg.version.includes('alpha') ? 'alpha' : 'latest'
const notifier = updateNotifier({
  distTag,
  pkg,
  updateCheckInterval: 0
})

notifier
  .fetchInfo()
  .then(res => {
    // 网络异常，获取不到包版本信息时，允许跳过检查
    const ignoreVersionCheck = process.argv.join('|').includes('ignoreVersionCheck')
    if (res.latest === res.current || ignoreVersionCheck) {
      // 主逻辑
      inquirer.prompt(QUESTIONS).then(answers => {
        newSdk({ ...PRESET_TEMPLATES[answers.template], ...answers })
      })
    } else {
      // 不适用 notifier 原生的输出方法，因为第一次运行的时候有几率不提示
      console.log(boxen(
        [
          `Update available ${chalk.dim(res.current)} → ${chalk.green(res.latest)}`,
          `${chalk.bold.blueBright(res.name)}'s version is ${chalk.red('too old')}`,
          `Please run ${chalk.cyan(`npm i ${res.name}@${distTag} -g`)} to update.`
        ].join('\n'),
        {
          padding: 1, borderColor: 'yellow', align: 'center', margin: 1
        }
      ))
    }
  }).catch(() => {
    console.log(chalk.red('Failed to get @baidu/draftbook version info!'))
    console.log(chalk.red('Please try again'))
    console.log(chalk.red('You can use \'draftbook add --ignoreVersionCheck\' to avoid version check'))
  })
