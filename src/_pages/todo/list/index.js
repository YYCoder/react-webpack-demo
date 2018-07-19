import React, { Component } from 'react'
import { Button, Toast } from 'antd-mobile'
import { dateFormat, arrUnique } from 'assets/utils'
import axios from 'axios'
import { connect } from 'react-redux'
// 导入actions
import { addTodo, initTodos, changeFilter } from 'actions/todo'
// 页面样式
import style from './style.scss'
// 导入自定义组件
import ItemList from './components/item-list'

class TodoList extends Component {
  constructor(props) {
    super(props)
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
        // 触发addTodoMultiple action，更新store
        this.props.initTodos(data)
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
  render() {
    const { list } = this.props
    return (
      <div className="todo-list">
        {
          arrUnique(list.map(ele => ele.status)).map(status => {
            return (
              <ItemList list={list} status={status} key={status} />
            )
          })
        }
        <ItemList list={list} />

        <div className="bottom">
          <Button type="primary" onClick={this.back.bind(this)}>点我返回上一页</Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state.todo
}
function mapDispatchToProps(dispatch) {
  return {
    addTodo(data) {
      dispatch(addTodo(data))
    },
    initTodos(data) {
      dispatch(initTodos(data))
    },
    changeFilter(data) {
      dispatch(changeFilter(data))
    }
  }
}
// 组件与Redux Store连接
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)

