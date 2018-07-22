const run = require('parallel-webpack').run
const webpackConfig = require('./webpack.dev.conf')
const configPath = require.resolve('./webpack.dev.conf')
const os = require('os')
const workers = os.cpus().length - 1
const webpack = require('webpack')

// yuanye：test
// console.log(JSON.stringify(webpackConfig))
// yuanye：单入口无需使用parallel-webpack
webpack(webpackConfig, (err, stats) => {
  if (err) {
    console.log(err.toString())
  }
})
/*run(configPath, {
    watch: true,
    maxRetries: 0,
    // stats: true,
    maxConcurrentWorkers: workers
}, (err, stats) => {})
*/