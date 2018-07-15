/**
 * demo页面控制器
 */
exports.index = async function () {
  await this.bindDefault()
  await this.render('app', {
    pageData: {
      data: 'index'
    }
  })
}

exports.a = async function () {
  await this.bindDefault()
  await this.render('app', {
    pageData: {
      data: 'a'
    }
  })
}

exports.b = async function () {
  await this.bindDefault()
  await this.render('app', {
    pageData: {
      data: 'b'
    }
  })
}

exports.c = async function () {
  await this.bindDefault()
  await this.render('app', {
    pageData: {
      data: 'c'
    }
  })
}