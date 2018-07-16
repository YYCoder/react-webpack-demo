import React, { Component } from 'react'
import style from './style.scss'
import { Button, Flex } from 'antd-mobile'

export default class TodoHome extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  goList() {
    this.props.history.push('/todo/list')
  }
  render() {
    return (
      <div className="todo-home">
        <h1>欢迎来到 todo list</h1>
        <Flex justify="center">
          <Flex.Item>
            <Button type="primary" onClick={this.goList.bind(this)}>进入todo list</Button>
          </Flex.Item>
        </Flex>
      </div>
    )
  }
}