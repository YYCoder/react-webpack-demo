const { setEntrys } = require('./utils')
const merge = require('webpack-merge')
/**
 * webpack配置拆分
 * @param {number} num 需要拆分成num份 
 * @param {} config 基础的webpack配置，在webpack.base.conf     
 * @param {} extraConfig 不同的环境需要区分的配置
 * @return {array} exportConfig 一个数组，每项均为一个webpack配置
 */
module.exports = function (num, config, extraConfig) {
  const entrys = config.entry,
    configNum = Math.ceil(num),
    entryNames = Object.keys(entrys),
    entryNum = entryNames.length - 1;//去掉common
  let exportConfig = [],
    tempConfig = [],
    pointer = 0; // 记录当前指向第几个配置的指针
  // 初始化num个配置
  for (let i = 0; i < configNum; i++) {
    let singleConfig = Object.assign({}, config)
    singleConfig.plugins = [].concat(config.plugins)
    singleConfig.entry = {}
    tempConfig.push(singleConfig)
  }
  // 循环所有的entry，依次添加进数组内的单个webpack配置里
  entryNames.forEach((name) => {
    // common 不作为的单独的页面入口
    if (name && name !== 'common') {
      tempConfig[pointer].entry[name] = entrys[name]
    }
    pointer === configNum - 1 ? pointer = 0 : pointer++
  })
  tempConfig.forEach((config, index) => {
    // 将common添加进配置的入口内
    config.entry.common = entrys.common
    exportConfig.push(merge(setEntrys(config), extraConfig))
  })

  return exportConfig
}