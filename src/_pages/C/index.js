import React, { Component } from 'react'

export default class C extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>我是C组件, { this.props.match.url }</div>
    )
  }
}