import React, { Component } from 'react'
import style from './style.scss'
import { Button, Card, WhiteSpace } from 'antd-mobile'
import { dateFormat } from 'assets/utils'

export default class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [{
        id: 1,
        name: '测试测试1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis nemo possimus temporibus dolore doloribus facere nisi, nostrum neque, quos qui. Reprehenderit, tempore sit odio deserunt numquam quia, delectus illo consequuntur!',
        createTime: dateFormat(Date.UTC(2018, 6, 10, 12)),
        updateTime: dateFormat(Date.UTC(2018, 6, 12, 11)),
        status: '已完成'
      }, {
        id: 2,
        name: '测试测试2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis et sunt, nesciunt optio reprehenderit unde quas. Doloremque, perspiciatis. Possimus ad qui excepturi, voluptas sequi, cumque placeat odit dicta aspernatur. Magnam!',
        createTime: dateFormat(Date.UTC(2018, 6, 15, 12)),
        updateTime: dateFormat(Date.UTC(2018, 6, 18, 11)),
        status: '已完成'
      }, {
        id: 1,
        name: '测试测试3',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam dolorem sit id corrupti, tempore ullam ipsa fugiat nostrum magni eveniet laboriosam sed, inventore. Omnis alias provident facere atque dolor adipisci?',
        createTime: dateFormat(Date.UTC(2018, 7, 10, 12)),
        updateTime: dateFormat(Date.UTC(2018, 7, 10, 12)),
        status: '未完成'
      }]
    }
  }
  back() {
    this.props.history.back()
  }
  changeStatus(id) {
    console.log(id)
  }
  readerItems(list = [], type = '未完成') {
    const CBody = Card.Body
    const CHeader = Card.Header
    const CFooter = Card.Footer
    const UnFinishedFooter = (data) => (
      <div className="unfinish-footer">
        <div className="update-time">
          <p className="update-time-text">更新时间</p>
          <p className="update-time-value">{data.updateTime}</p>
        </div>
        <div className="button-wrap">
          <Button size="small" inline type="primary" onClick={this.changeStatus.bind(this, data.id)}>修改状态</Button>
        </div>
      </div>
    )

    return list.filter((ele) => ele.status === type).map((ele) => {
      return (
        <Card key={ele.id}>
          <CHeader title={ele.name}></CHeader>
          <CBody>
            {ele.content}
          </CBody>
          {
            type === '已完成' ? <CFooter content="更新时间" extra={ele.updateTime}></CFooter>
                             : <CFooter content={<UnFinishedFooter {...ele} />}></CFooter>
          }
        </Card>
      )
    })
  }
  render() {
    const { list } = this.state

    return (
      <div className="todo-list">
        <div className="unfinished list">
          <h2 className="header-title">未完成</h2>
          {this.readerItems(list, '未完成')}
        </div>
        <div className="finished list">
          <h2 className="header-title">已完成</h2>
          {this.readerItems(list, '已完成')}
        </div>

        <div className="bottom">
          <Button type="primary" onClick={this.back.bind(this)}>点我返回上一页</Button>
        </div>
      </div>
    )
  }
}