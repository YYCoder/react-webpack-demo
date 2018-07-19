import React, { Component } from 'react'
import { Button, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import { changeTodoStatus } from 'actions/todo'
import './style.scss'

export class UnFinishedFooter extends Component {
  constructor(props) {
    super(props)
  }
  goEdit(id) {
    this.props.history.push(`/todo/edit/${id}`)
  }
  changeStatus(id) {
    const { changeTodoStatus } = this.props
    if (!id) return Toast.fail('请选择要编辑的项目')
    Modal.alert('请选择要修改的状态', '', [
      { text: '已完成', onPress: () => { changeTodoStatus.call(this, { id, status: '已完成' }) }},
      { text: '已删除', onPress: () => { changeTodoStatus.call(this, { id, status: '已删除' }) }},
      { text: '延后', onPress: () => { changeTodoStatus.call(this, { id, status: '延后' }) }},
    ])
  }
  render() {
    const { changeTodoStatus, data } = this.props

    return (
      <div className="unfinish-footer">
        <div className="update-time">
          <p className="update-time-text">更新时间</p>
          <p className="update-time-value">{data.updateTime}</p>
        </div>
        <div className="button-wrap">
          <Button size="small" inline type="primary" onClick={this.changeStatus.bind(this, data.id)}>修改状态</Button>
          <Button size="small" inline type="primary" onClick={this.goEdit.bind(this, data.id)}>编辑信息</Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  // console.log(`mapStateToProps接受的state: ${JSON.stringify(state)}`)
  // console.log(`mapStateToProps接受的ownProps: ${JSON.stringify(ownProps)}`)
  // return state.todo
  return ownProps
}
function mapDispatchToProps(dispatch) {
  return {
    changeTodoStatus(data) {
      dispatch(changeTodoStatus(data))
    }
  }
}
// 组件与Redux Store连接
export default connect(mapStateToProps, mapDispatchToProps)(UnFinishedFooter)
