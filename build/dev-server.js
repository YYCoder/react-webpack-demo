const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

const config = require('./config')
const { resolve } = require('./utils')
const path = require('path')
const webpackConfig = require('./webpack.dev.conf')
// console.log(webpackConfig)
// console.log(webpackConfig.output)
// console.log(path.join(config.dev.assetsRoot, config.dev.assetsSubDirectory, 'js'))
const options = {
  contentBase: webpackConfig.output.path,
  hot: true,
  host: '127.0.0.1',
  proxy: {
    // '*': 'http://localhost:3001'
    '/todo': 'http://localhost:3001',
    '/react-webpack-demo': 'http://localhost:3001',
    '/ajax': 'http://localhost:3001',
    '/home': 'http://localhost:3001'
  },
  stats: {
    colors: true
  },
  historyApiFallback: true, //不跳转
  inline: true, //实时刷新
}

webpackDevServer.addDevServerEntrypoints(webpackConfig, options)
const compiler = webpack(webpackConfig)
const server = new webpackDevServer(compiler, options)

server.listen(5000, '127.0.0.1', () => {
  console.log('dev server listening on port 5000')
})