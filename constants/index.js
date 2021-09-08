const inquirer = require('inquirer')

const TEMPLATE_NAME = {
  FAST_START: 'fast-start',
  CUSTOM: 'custom'
}

const QUESTIONS = [
  {
    type: 'input',
    name: 'name',
    message: 'What\'s your SDK name?',
    default: 'my-sdk',
    validate (data) {
      if (data.toLowerCase() === data) {
        return true
      }
      return 'Name cannot contain uppercase'
    }
  },
  {
    type: 'list',
    name: 'template',
    message: 'Select a template',
    default: TEMPLATE_NAME.FAST_START,
    choices: [TEMPLATE_NAME.FAST_START, TEMPLATE_NAME.CUSTOM]
  },
  {
    type: 'list',
    name: 'babel',
    message: 'How to convert API to backward-compatible versions with Babel',
    default: 'ignore',
    choices: [
      new inquirer.Separator('API: Promise、[].includes ...'),
      new inquirer.Separator('Syntax: {...obj}, ()=>{}, const ...'),
      new inquirer.Separator('Either way, it will transform Syntax'),
      {
        name: 'ignore (Consumer has converted API with @babel/polyfill)',
        value: 'ignore'
      },
      {
        name: 'dependencies @babel/runtime (Consumers didn\'t convert API)',
        value: 'runtime'
      },
      {
        name: 'peerDependencies @babel/runtime (Consumer has converted API with @babel/runtime)',
        value: 'peer runtime'
      }
    ],
    when (answers) {
      return answers.template === TEMPLATE_NAME.CUSTOM
    }
  },
  {
    type: 'confirm',
    name: 'typescript',
    message: 'Use Typescript',
    default: true
  },
  {
    type: 'list',
    name: 'framework',
    message: 'Choice a framework (Look out for vue and react)',
    default: 'none',
    choices: ['none'],
    when (answers) {
      return answers.template === TEMPLATE_NAME.CUSTOM
    }
  },
  {
    type: 'confirm',
    name: 'eslint',
    message: 'Use EsLint',
    default: false,
    when (answers) {
      return answers.template === TEMPLATE_NAME.CUSTOM
    }
  },
  {
    type: 'confirm',
    name: 'husky',
    message: 'Use Husky',
    default: false,
    when (answers) {
      return answers.template === TEMPLATE_NAME.CUSTOM &&
        answers.eslint
    }
  }
]

module.exports = {
  TEMPLATE_NAME,
  QUESTIONS
}
