import React, { Component } from 'react'
import style from './style.scss'

export default class A extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="a">我是A组件</div>
    )
  }
}