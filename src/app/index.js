import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import { render } from 'react-dom'
import asyncComponent from 'assets/async'
import createBrowserHistory from 'history/createBrowserHistory'
// 数据管理
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import rootReducer from 'reducers'
// 引入全局样式
import './style.scss'


// 异步导入组件
const Home = asyncComponent(() => import('_pages/home'))
const TodoHome = asyncComponent(() => import('_pages/todo/home'))
const TodoList = asyncComponent(() => import('_pages/todo/list'))
const TodoEdit = asyncComponent(() => import('_pages/todo/edit'))


// 根组件
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: window.CONSTANT.pageData
    }
  }
  render() {
    return (
      <div className="wrap">
        <Route exact path="/home" component={Home} />
        <Route exact path="/todo" component={TodoHome} />
        <Route exact path="/todo/edit/:id" component={TodoEdit} />
        <Route exact path="/todo/list" component={TodoList} />
      </div>
    )
  }
}

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












