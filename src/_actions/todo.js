/**
 * todo所有action creator
 */
import fetch from 'cross-fetch'
import { Toast } from 'antd-mobile'
/**
 * 添加todo项目
 */
function addTodo({
  id,
  content,
  name,
  createTime,
  updateTime
}) {
  return {
    type: 'ADD_TODO',
    data: { id, content, name, createTime, updateTime }
  }
}
/**
 * 初始化整个todoList
 */
function initTodos(todoArr) {
  return {
    type: 'INIT_TODOS',
    data: todoArr
  }
}
/**
 * 修改获取todo数据的加载状态
 */
function changeFetchTodosStatus(isFetching) {
  return {
    type: 'CHANGE_FETCH_TODO_STATUS',
    isFetching
  }
}
/**
 * 请求todo数据（thunk action）
 */
function requestTodos(url, params = {}) {
  // 返回thunk函数
  return function(dispatch) {
    Toast.loading('加载中', 30)
    // 先修改加载状态
    dispatch(changeFetchTodosStatus(true))

    return fetch(url, params)
    .then((res) => {
      return res.json()
    }, (err) => {
      Toast.fail('网络异常，请稍后重试')
      console.error(`Fetch Error: ${err.toString()}`)
    })
    .then(({ code, message, data }) => {
      Toast.hide()
      if (code === 0) {
        // 在修改todolist
        dispatch(initTodos(data))
        dispatch(changeFetchTodosStatus(false))
      }
      else {
        Toast.fail(message || '网络异常，请稍后重试')
        dispatch(changeFetchTodosStatus(false))
      }
    })
  }
}
/**
 * 修改filter
 */
const changeFilter = filter => ({
  type: 'CHANGE_FILTER',
  filter
})
/**
 * 修改todo项目的状态
 */
function changeTodoStatus({ id, status }) {
  return {
    type: 'CHANGE_TODO_STATUS',
    data: { id, status }
  }
}
/**
 * 编辑todo项目内容
 */
function editTodo({ id, name, content }) {
  return {
    type: 'EDIT_TODO',
    data: { id, name, content }
  }
}

export {
  addTodo,
  initTodos,
  requestTodos,
  changeFilter,
  changeFetchTodosStatus,
  changeTodoStatus,
  editTodo
}




