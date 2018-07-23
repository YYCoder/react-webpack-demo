import React, { Component } from 'react'
import { Button, SegmentedControl } from 'antd-mobile'
import { findIndex } from 'assets/utils'
import { connect } from 'react-redux'
// 导入actions
import { addTodo, requestTodos, changeFilter } from 'actions/todo'
// 页面样式
import style from './style.scss'
// 导入自定义组件
import ItemList from './components/item-list'

class TodoList extends Component {
  constructor(props) {
    super(props)
    // 获取数据，更新list
    props.requestTodos()
  }
  back() {
    this.props.history.goBack()
  }
  render() {
    const { list, filterList, filter } = this.props
    const filterIndex = findIndex(filterList, filter)[0]
    const listFilteredStatus = filterList.filter(status => filter !== '全部' ? status === filter : true)

    return (
      <div className="todo-list">
        <div className="filter-wrap">
          <SegmentedControl values={filterList} selectedIndex={filterIndex} onChange={(e) => this.props.changeFilter.call(this, e.nativeEvent.value)} />
        </div>
        {
          listFilteredStatus.filter(status => status !== '全部').map(status => {
            return (
              <ItemList list={list} status={status} key={status} />
            )
          })
        }
        <div className="bottom">
          <Button type="primary" onClick={this.back.bind(this)}>点我返回上一页</Button>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state, ownProps) {
  // 过滤todo数据状态，每当全局state发生变化，就会执行该回调
  const { todo } = state
  const { filter, filterList } = todo
  const list = todo.list.filter(ele => filter !== '全部' ? ele.status === filter : true)

  return {
    filter,
    list,
    filterList
  }
}
function mapDispatchToProps(dispatch) {
  return {
    addTodo(data) {
      dispatch(addTodo(data))
    },
    requestTodos() {
      dispatch(requestTodos('/ajax/todo/list'))
    },
    changeFilter(data) {
      dispatch(changeFilter(data))
    }
  }
}
// 组件与Redux Store连接
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)

