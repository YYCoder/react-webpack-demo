import React, { Component } from 'react'
import style from './style.scss'
import { Button, Card, Toast, Modal } from 'antd-mobile'
import { dateFormat, find, arrUnique } from 'assets/utils'
import axios from 'axios'

export default class TodoList extends Component {
  constructor(props) {
    super(props)
    // 初始化state
    this.state = {
      list: []
    }
    // 获取数据，更新list
    this.getList()
  }
  getList() {
    Toast.loading('加载中...', 10)
    axios.get('/ajax/todo/list')
    .then(({ data, status, statusText }) => {
      if (status === 200) {
        data.forEach((ele) => {
          ele.createTime = dateFormat(ele.createTime)
          ele.updateTime = dateFormat(ele.updateTime)
        })
        this.setState({
          list: data
        })        
        Toast.hide()
      }
      else {
        Toast.fail(statusText || '网络异常，请稍后重试')
      }
    })
    .catch((err) => {
      Toast.fail('网络异常，请稍后重试')
    })
  }
  back() {
    this.props.history.goBack()
  }
  goEdit(id) {
    this.props.history.push(`/todo/edit/${id}`)
  }
  changeStatus(id) {
    if (!id) return Toast.fail('请选择要编辑的项目')
    Modal.alert('请选择要修改的状态', '', [
      { text: '已完成', onPress: () => { this.changeItemStatus.call(this, id, '已完成') }},
      { text: '已删除', onPress: () => { this.changeItemStatus.call(this, id, '已删除') }},
      { text: '延后', onPress: () => { this.changeItemStatus.call(this, id, '延后') }},
    ])
  }
  changeItemStatus(id, status) {
    const { list } = this.state
    const item = find(list, (ele) => ele.id === id)[0]
    // 修改状态
    item.status = status
    // 生成新对象
    const newList = [].concat(list)
    this.setState({
      list: newList
    })
  }
  unFinishedFooter(data) {
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
  renderItems(list = [], status = '未完成') {
    const CBody = Card.Body
    const CHeader = Card.Header

    return list.filter((ele) => ele.status === status).map((ele) => {
      return (
        <Card key={ele.id}>
          <CHeader title={ele.name}></CHeader>
          <CBody>
            {ele.content}
          </CBody>
          {this.getItemFooter(ele.status, ele)}
        </Card>
      )
    })
  }
  getItemFooter(status, data) {
    const CFooter = Card.Footer
    const statusMap = {
      '已完成': <CFooter content="完成时间" extra={data.updateTime}></CFooter>,
      '未完成': <CFooter content={this.unFinishedFooter(data)}></CFooter>,
      '延后': <CFooter content="更新时间" extra={data.updateTime}></CFooter>,
      '已删除': <CFooter content="结束时间" extra={data.updateTime}></CFooter>
    }
    return statusMap[status]
  }
  renderList(list) {
    return arrUnique(list.map(ele => ele.status)).map(status => {
      return (
        <div className="list" key={status}>
          <h2 className="header-title">{status}</h2>
          {this.renderItems(list, status)}
        </div>
      )      
    })
  }
  render() {
    const { list } = this.state

    return (
      <div className="todo-list">
        {this.renderList(list)}

        <div className="bottom">
          <Button type="primary" onClick={this.back.bind(this)}>点我返回上一页</Button>
        </div>
      </div>
    )
  }
}