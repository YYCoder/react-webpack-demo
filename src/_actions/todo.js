/**
 * todo所有action
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
function initTodos(todoArr) {
  return {
    type: 'INIT_TODOS',
    data: todoArr
  }
}
const changeFilter = filter => ({
  type: 'CHANGE_FILTER',
  filter
})

function changeTodoStatus({ id, status }) {
  return {
    type: 'CHANGE_TODO_STATUS',
    data: { id, status }
  }
}

function editTodo({ id, name, content }) {
  return {
    type: 'EDIT_TODO',
    data: { id, name, content }
  }
}

export {
  addTodo,
  initTodos,
  changeFilter,
  changeTodoStatus,
  editTodo
}




