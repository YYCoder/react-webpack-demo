import React, { Component } from 'react'
import style from './style.scss'

export default class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  backHome() {
    console.log(this.props.history)
    this.props.history.push('/home')
  }
  render() {
    return (
      <div className="todo">
        todo list
        <a href="javascript:;" onClick={this.backHome.bind(this)}>点我返回首页</a>
      </div>
    )
  }
}