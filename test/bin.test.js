const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

const binDir = path.resolve(__dirname, '../bin')
const snapshot = path.resolve(__dirname, './snapshot-bin')

// bin 文件会被测试，但是无法被计入 Coverage
describe('Bin\n', () => {
  beforeAll(() => {
    if (!fs.existsSync(snapshot)) {
      fs.mkdirSync(snapshot)
    }
    process.chdir(snapshot)
  })

  it('Draftbook', done => {
    const output = spawn('node', [path.resolve(binDir, 'draftbook.js'), '-h'])
    const stdout = 'Usage: draftbook [options] [command]\n' +
            '\n' +
            'Options:\n' +
            '  -v, --version   output the current version\n' +
            '  -h, --help      display help for command\n' +
            '\n' +
            'Commands:\n' +
            '  add             create a new sdk in current dir\n' +
            '  help [command]  display help for command\n'

    output.stdout.on('data', data => {
      expect(stdout.toString()).toEqual(data.toString())
    })

    output.on('close', code => {
      expect(code).toEqual(0)
      done()
    })
  })

  it('Draftbook Add', done => {
    const output = spawn('node', [path.resolve(binDir, 'draftbook-add.js'), '-h'])
    output.stdout.on('data', () => {
      // mock 回车
      output.stdin.write('\n')
    })

    output.on('close', code => {
      expect(code).toEqual(0)
      done()
    })
  })

  afterAll(() => {
    fs.rmdirSync(snapshot, { force: true, recursive: true })
    fs.mkdirSync(snapshot)
  })
})
