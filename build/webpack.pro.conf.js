const path = require('path')
const { styleLoaders, assetsPath, resolve, setEntrys } = require('./utils')
const config = require('./config')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.conf')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')

const proConfig = {
  watch: false,
  module: {
    rules: styleLoaders()
  },
  output: {
    path: config.pro.assetsRoot,
    filename: assetsPath('js/[name]/build-[chunkhash:10].js'),
    chunkFilename: assetsPath('js/[id]/[id]-[chunkhash:10].js')
  },
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({'process.env': config.pro.env}),
    new UglifyJsPlugin({
      test: /\.js$/i,
      cache: config.pro.cacheDir,
      parallel: true,
      sourceMap: true
    })
  ]
}
const entrys = baseWebpackConfig.entry
const entrylength = Object.keys(entrys).length - 1
const exportConfig = require('./entry-split.js')(entrylength, baseWebpackConfig, proConfig)

module.exports = exportConfig
