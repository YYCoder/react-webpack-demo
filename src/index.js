import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import { render } from 'react-dom'
import createBrowserHistory from 'history/createBrowserHistory'
// 数据管理
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import rootReducer from 'reducers'
// 引入根组件
import App from './app'

// yuanye：热重载没搞明白
/*if (module.hot) {
  console.log(module)
  module.hot.accept('./_pages/todo/list/index.js', function() {
    console.log('Accepting the updated printMe module!')
  })
}*/
const loggerMiddleware = createLogger()
// 创建Store
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // 允许我们 dispatch() 函数
    loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
  )
)
// 将store直接挂到window，方便调试
window.store = store
// 开启路由
const history = createBrowserHistory()
render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}></Route>
    </Router>
  </Provider>
), document.getElementById('app'))
