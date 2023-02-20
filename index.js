const tsNode = require('ts-node')
tsNode.register({
    project: './tsconfig.json',
    require: ['tsconfig-paths/register'],
    preferTsExts: true,
    ignore: [/(?!.*\/(?:watch-process-death)\/).*node_modules/],
})
const tsIndex = require('./src/index.ts')
module.exports = tsIndex
