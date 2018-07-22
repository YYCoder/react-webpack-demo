/*const path = require('path')
const Koa = require('koa')
const app = new Koa()

// 引入webpack-dev-middleware用于热重载
const webpack = require('webpack')
const webpackConfig = require('./webpack.dev.conf')
const compiler = webpack(webpackConfig)
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
})
const hotMiddleware = require('webpack-hot-middleware')(compiler)
// console.log(webpackConfig)
app.use((ctx, next) => devMiddleware())
app.use((ctx, next) => hotMiddleware())

app.listen(4000)*/

const path = require('path')
const webpack = require('webpack')
const express = require('express')
const config = require('./webpack.dev.conf')

const app = express()
const compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', function(req, res) {
  res.end('hello')
  // res.sendFile(path.join(__dirname, '../index.html'))
})

app.listen(5000, function(err) {
  if (err) {
    return console.error(err);
  }
})
