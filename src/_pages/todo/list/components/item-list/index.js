import React, { Component } from 'react'
import './style.scss'
// 引入自定义组件
import Item from '../item'

export default class ItemList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { list, status } = this.props

    return (
      <div className="list">
        <h2 className="header-title">{status}</h2>
        {
          list.filter((ele) => ele.status === status).map((ele) => {
            return (
              <Item data={ele} key={ele.id} />
            )
          })
        }
      </div>
    )
  }
}
