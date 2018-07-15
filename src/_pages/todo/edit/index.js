import React, { Component } from 'react'
import style from './style.scss'

export default class TodoEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="todo-edit">todo edit { this.props.match.params.id }</div>
    )
  }
}