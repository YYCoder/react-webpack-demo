import React, { Component } from 'react'
import { Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeTodoStatus } from 'actions/todo'
import { dateFormat } from 'assets/utils'
import './style.scss'

class UnFinishedFooter extends Component {
  constructor(props) {
    super(props)
  }
  changeStatus(id) {
    const { dispatch } = this.props
    if (!id) return Toast.fail('请选择要编辑的项目')
    Modal.alert('请选择要修改的状态', '', [
      { text: '未完成', onPress: () => { dispatch(changeTodoStatus.call(this, { id, status: '未完成' })) }},
      { text: '已完成', onPress: () => { dispatch(changeTodoStatus.call(this, { id, status: '已完成' })) }},
      { text: '已删除', onPress: () => { dispatch(changeTodoStatus.call(this, { id, status: '已删除' })) }},
      { text: '延后', onPress: () => { dispatch(changeTodoStatus.call(this, { id, status: '延后' })) }},
    ])
  }
  render() {
    const { changeTodoStatus, data } = this.props
    const updateTime = dateFormat(data.updateTime)

    return (
      <div className="unfinish-footer">
        <div className="update-time">
          <p className="update-time-text">更新时间</p>
          <p className="update-time-value">{updateTime}</p>
        </div>
        <div className="button-wrap">
          <div className="button" onClick={this.changeStatus.bind(this, data.id)}>修改状态</div>
          <div className="button">
            <Link to={`/todo/edit/${data.id}`}>编辑信息</Link>
          </div>
        </div>
      </div>
    )
  }
}

// 组件与Redux Store连接
export default connect((state, ownProps) => ownProps)(UnFinishedFooter)
