const fs = require('fs')
const path = require('path')
const { newSdk } = require('../lib/index')
const { allPossibleAnsers } = require('./utils')

const snapshot = path.resolve(__dirname, './snapshot-lib')

describe('Lib Test\n', () => {
  beforeAll(() => {
    if (!fs.existsSync(snapshot)) {
      fs.mkdirSync(snapshot)
    }
    process.chdir(snapshot)
  })

  allPossibleAnsers.forEach(answer => {
    it(`Different Answer Check ${JSON.stringify(answer)}\n`, () => {
      newSdk(answer)
    })
  })

  it('Exists SDK Check', () => {
    newSdk(allPossibleAnsers[0])
  })

  afterAll(() => {
    fs.rmdirSync(snapshot, { force: true, recursive: true })
    fs.mkdirSync(snapshot)
  })
})
