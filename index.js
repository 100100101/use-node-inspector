const path = require('node:path')
const { execFileSync } = require('node:child_process')
const pathToTsc = path.join(__dirname, 'node_modules/typescript/bin/tsc')
const pathToTsConfig = path.join(__dirname, 'tsconfig.json')
const tsconfig = require(pathToTsConfig)
const outDir = tsconfig.compilerOptions.outDir
execFileSync(process.execPath, [pathToTsc, '--project', pathToTsConfig], {
    cwd: __dirname,
})
const transpiledModule = require(outDir)
module.exports = transpiledModule
