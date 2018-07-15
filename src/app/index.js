import React, { Component } from 'react'
import { Router, Route, Link } from 'react-router-dom'
import { render } from 'react-dom'
import asyncComponent from 'assets/async'
// import { observer } from 'mobx-react'
import createBrowserHistory from 'history/createBrowserHistory'
// 引入全局样式
import './style.scss'


// 异步导入组件
const Home = asyncComponent(() => import('_pages/home'))
const A = asyncComponent(() => import('_pages/A'))
const B = asyncComponent(() => import('_pages/B'))
const C = asyncComponent(() => import('_pages/C'))
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
  componentDidMount() {
    console.log('componentDidMount')
  }
  render() {
    return (
      <div className="wrap">
        <Route exact path="/home" component={Home} />
        <Route exact path="/todo" component={TodoHome} />
        <Route exact path="/todo/edit/:id" component={TodoEdit} />
        <Route exact path="/todo/list" component={TodoList} />
        <Route exact path="/test/a" component={A} />
        <Route exact path="/test/b" component={B} />
        <Route exact path="/test/c" component={C} />
      </div>
    )
  }
}

// 路由
const history = createBrowserHistory()
render((
  <Router history={history}>
    <Route path="/" component={App}></Route>
  </Router>
), document.getElementById('app'))












