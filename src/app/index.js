import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import asyncComponent from 'assets/async'
// 热重载
import { hot } from 'react-hot-loader'
// 引入全局样式
import './style.scss'

// 异步导入组件
const Home = asyncComponent(() => import('_pages/home'))
const TodoHome = asyncComponent(() => import('_pages/todo/home'))
const TodoList = asyncComponent(() => import('_pages/todo/list'))
const TodoEdit = asyncComponent(() => import('_pages/todo/edit'))

// yuanye：test
// console.log(456)
// 根组件
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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

export default hot(module)(App)












