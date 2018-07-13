/**
 * demo页面控制器
 */
exports.index = async function () {
  await this.bindDefault()
  await this.render('app', {
    pageData: {
      test: 'test'
    }
  })
}

