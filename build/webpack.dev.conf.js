const path = require('path')
const { styleLoaders, assetsPath } = require('./utils')
const config = require('./config')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const devConfig = {
  watch: true,
  module: {
    rules: styleLoaders()
  },
  output: {
    path: config.build.assetsRoot,
    filename: assetsPath('js/[name]/build.js'),
    chunkFilename: assetsPath('js/[id]/chunk.js')
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({'process.env': config.dev.env}),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
}
const entrys = baseWebpackConfig.entry
const entrylength = Object.keys(entrys).length - 1
const exportConfig = require('./entry-split.js')(entrylength, baseWebpackConfig, devConfig)

module.exports = exportConfig
