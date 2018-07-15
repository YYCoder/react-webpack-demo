import React, { Component } from 'react'
import style from './style.scss'
import { Toast, Flex, Button } from 'antd-mobile'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  goTodo() {
    console.log(this.props.history)
    this.props.history.push('/todo')
  }
  toggleToast() {
    Toast.info('我是toast', 2, () => {
      console.log('toast关闭')
    }, true)
  }
  render() {
    return (
      <div className="home">
        <h1>我是首页</h1>
        <Flex>
          <Flex.Item><Button type="primary" onClick={this.goTodo.bind(this)}>点我跳转todo</Button></Flex.Item>
          <Flex.Item><Button type="ghost" onClick={this.toggleToast.bind(this)}>点我toast</Button></Flex.Item>
        </Flex>
      </div>
    )
  }
}