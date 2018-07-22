const run = require('parallel-webpack').run
const webpackConfig = require('./webpack.pro.conf')
const configPath = require.resolve('./webpack.pro.conf')
const config = require('./config')
const os = require('os')
const workers = os.cpus().length - 1
const shell = require('shelljs')
const path = require('path')
const assetsPath = path.join(config.pro.assetsRoot, config.pro.assetsSubDirectory)

shell.rm('-rf', assetsPath)
shell.mkdir('-p', assetsPath)
// 初始化UglifyJsPlugin缓存目录
shell.mkdir('-p', config.pro.cacheDir)
// yuanye：test
// console.log(JSON.stringify(webpackConfig))
run(configPath, {
    watch: false,
    maxRetries: 0,
    // stats: true,
    maxConcurrentWorkers: workers
}, (err, stats) => {})
