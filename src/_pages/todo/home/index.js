import React, { Component } from 'react'
import style from './style.scss'

export default class TodoHome extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  goList() {
    console.log(this.props.history)
    this.props.history.push('/todo/list')
  }
  render() {
    return (
      <div className="todo-home">
        欢迎来到 todo list
        <a href="javascript:;" onClick={this.goList.bind(this)}>点我跳转list</a>
      </div>
    )
  }
}