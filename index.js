const path = require('node:path')
const { execFileSync } = require('node:child_process')
const pathToTsc = require.resolve('typescript/bin/tsc')
const pathToTsConfig = path.join(__dirname, 'tsconfig.json')
execFileSync(process.execPath, [pathToTsc, '--project', pathToTsConfig], {
    cwd: __dirname,
})
const transpiledModule = require('./lib')
module.exports = transpiledModule
