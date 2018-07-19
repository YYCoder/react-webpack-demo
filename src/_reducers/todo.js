/**
 * todo所有reducer
 */
import { createReducer, updateObject, updateItemInArray } from './utils'
// todo初始化state
const initTodoState = {
  // 可展示的item status
  filter: 'all',
  // 所有todo item列表
  list: []
}
const todoReducers = {
  changeTodoStatus(todoState, action) {
    const { data: { id, status } } = action
    const { list } = todoState
    const getItemCb = (ele) => ele.id === id
    const updateItemCb = (ele) => ({ ...ele, ...{ status } })
    let newTodos = updateItemInArray(list, getItemCb, updateItemCb)

    return updateObject(todoState, { list: newTodos })
  },
  addTodo(todoState, action) {
    const { data } = action
    const { list } = todoState
    const newTodos = list.concat({
      id: data.id,
      name: data.name,
      content: data.content,
      createTime: data.createTime,
      updateTime: data.updateTime,
      status: 'unfinish'
    })
    return updateObject(todoState, { list: newTodos })
  },
  initTodos(todoState, action) {
    const { data } = action
    const newTodos = [].concat(data)
    return updateObject(todoState, { list: newTodos })
  },
  editTodo(todoState, action) {
    const { data } = action
    console.log(`编辑todo ${data.id}`)
  },
  changeFilter(todoState, action) {
    const { filter } = action
    console.log(`修改filter ${filter}`)
  }
}

const todoReducer = createReducer(initTodoState, {
  'ADD_TODO': todoReducers.addTodo,
  'INIT_TODOS': todoReducers.initTodos,
  'CHANGE_TODO_STATUS': todoReducers.changeTodoStatus,
  'EDIT_TODO': todoReducers.editTodo,
  'CHANGE_FILTER': todoReducers.changeFilter
})
export default todoReducer
