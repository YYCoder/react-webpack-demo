const path = require('path')
const projectRoot = path.resolve(__dirname, '..')
// yuanye：写死当前测试grace服务器路径
const graceRoot = '/Users/yuanye/study/project'

/**
 * 检查grace目录结构是否正确
 * @value graceServer
 * @params serverRoot
 * @params serverConf
 */
const graceServer = require('./check-server')(graceRoot)

const baseConf = {
  moduleName: path.basename(projectRoot),
  projectRoot: projectRoot,
  serverRoot: graceServer.serverRoot,
  serverConf: graceServer.serverConf,
  // yuanye：test先写死为本地grace服务路径
  outputRoot: path.resolve(`${graceRoot}/localServer/app/${path.basename(projectRoot)}`),
  entryTemplate: path.resolve(projectRoot, 'views/common/_template.ejs'),
  hardSourceCacheDir: `${path.resolve(__dirname, '../node_modules')}/.hard-source-cache`
}
const buildConf = {
  env: {
    NODE_ENV: '"production"'
  },
  assetsRoot: baseConf.outputRoot,
  // yuanye：test先写死为本地grace服务
  // assetsPublicPath: `{{constant.cdn}}/${baseConf.moduleName}/`,
  assetsPublicPath: `http://127.0.0.1:3001/${baseConf.moduleName}/`,
  assetsSubDirectory: 'static',
  productionSourceMap: false || !!process.env.npm_config_map
}
const devConf = {
  env: {
    NODE_ENV: '"development"'
  },
  assetsRoot: baseConf.outputRoot,
  assetsPublicPath: path.resolve('/', baseConf.moduleName) + '/',
  assetsSubDirectory: 'static'
}

module.exports = {
  build: buildConf,
  base: baseConf,
  dev: devConf
}
