import React, { Component } from 'react'

export default class B extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    return (
      <div>我是B组件, { this.props.match.url }</div>
    )
  }
}