#!/usr/bin/env node
const { program } = require('commander')
const pkg = require('../package.json')

program
  .version(pkg.version, '-v, --version', 'output the current version')
  .command('add', 'create a new sdk in current dir')
  .parse()
