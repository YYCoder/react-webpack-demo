/**
 * todo所有reducer
 */
import { createReducer, updateObject, updateItemInArray } from './utils'
// todo初始化state
const initTodoState = {
  // 可展示的item status
  filter: '全部',
  // 所有todo item列表
  list: [],
  // 是否在请求flag
  isFetching: false
}

function changeTodoStatus(todoState, action) {
  const { data: { id, status } } = action
  const { list } = todoState
  const getItemCb = (ele) => ele.id === id
  const updateItemCb = (ele) => ({ ...ele, ...{ status } })
  let newTodos = updateItemInArray(list, getItemCb, updateItemCb)

  return updateObject(todoState, { list: newTodos })
}
function addTodo(todoState, action) {
  const {
    data: {
      id,
      name,
      content,
      createTime,
      updateTime
    }
  } = action
  const { list } = todoState
  const newTodos = list.concat([{
    id,
    name,
    content,
    createTime,
    updateTime,
    status: '未完成'
  }])
  return updateObject(todoState, { list: newTodos })
}
function initTodos(todoState, action) {
  const { data } = action
  const newList = [].concat(data)
  return updateObject(todoState, { list: newList })
}
function editTodo(todoState, action) {
  const { data } = action
  console.log(`编辑todo ${data.id}`)
}
function changeFilter(todoState, action) {
  const { filter } = action
  return updateObject(todoState, { filter })
}
function changeFetchTodosStatus(todoState, action) {
  const { isFetching } = action
  return updateObject(todoState, { isFetching })
}


const todoReducer = createReducer(initTodoState, {
  'ADD_TODO': addTodo,
  'INIT_TODOS': initTodos,
  'CHANGE_TODO_STATUS': changeTodoStatus,
  'CHANGE_FETCH_TODO_STATUS': changeFetchTodosStatus,
  'EDIT_TODO': editTodo,
  'CHANGE_FILTER': changeFilter
})
export default todoReducer
