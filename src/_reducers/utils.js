/**
 * reducer工具函数
 */
function updateObject(oldObject, newValues) {
  // 将空对象作为第一个参数传递给 Object.assign，以确保只是复制数据，而不是去改变数据
  return { ...oldObject, ...newValues }
}
/**
 * 更新数组中的指定项目，返回新数组
 * @param  {Array} array [要修改的数组]
 * @param  {Function} getItemCallback [判断是否为要修改的item回调函数，参数为item]
 * @param  {Function} updateItemCallback [更新item回调，参数为item，应返回新item]
 * @return {Array} [返回新数组]
 */
function updateItemInArray(array, getItemCallback, updateItemCallback) {
  const updatedItems = array.map(item => {
    // 因为我们只想更新一个项目，所以保留所有的其他项目
    if (!getItemCallback(item)) {
      return item
    }
    // 使用提供的回调来创建新的项目
    const updatedItem = updateItemCallback(item)
    return updatedItem
  })
  return updatedItems
}
/**
 * 创建Reducer
 * @param  {Any} initialState [指定slice reducer的初始state]
 * @param  {Object} handlers [各种action.type对应的reducer Map]
 * @return {Function} [指定reducer]
 */
function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export {
  updateObject,
  updateItemInArray,
  createReducer
}