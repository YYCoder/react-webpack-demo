const run = require('parallel-webpack').run
const webpackConfig = require('./webpack.dev.conf')
const configPath = require.resolve('./webpack.dev.conf')
const os = require('os')
const workers = os.cpus().length - 1

// yuanye：test
console.log(JSON.stringify(webpackConfig))
run(configPath, {
    watch: true,
    maxRetries: 0,
    // stats: true,
    maxConcurrentWorkers: workers
}, (err, stats) => {})
