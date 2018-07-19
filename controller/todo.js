/**
 * todoList页面控制器
 */
exports.index = async function () {
  await this.bindDefault()
  await this.render('app', {
    pageData: {
      data: 'index'
    }
  })
}

exports.edit = async function () {
  await this.bindDefault()
  await this.render('app', {
    pageData: {
      data: 'a'
    }
  })
}

exports.list = async function () {
  await this.bindDefault()
  await this.render('app', {
    pageData: {
      data: 'b'
    }
  })
}


