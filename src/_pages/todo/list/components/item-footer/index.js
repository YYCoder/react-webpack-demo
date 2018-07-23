import React from 'react'
import { Card } from 'antd-mobile'
import { dateFormat } from 'assets/utils'
// 导入自定义组件
import UnFinishedFooter from '../unfinished-footer'

export default function ItemFooter(props) {
  const CFooter = Card.Footer
  const { status, data } = props
  const updateTime = dateFormat(data.updateTime)
  // 处理下时间格式
  const statusMap = {
    '已完成': <CFooter content="完成时间" extra={updateTime}></CFooter>,
    '未完成': <CFooter content={<UnFinishedFooter data={data} />}></CFooter>,
    '延后': <CFooter content="更新时间" extra={updateTime}></CFooter>,
    '已删除': <CFooter content="结束时间" extra={updateTime}></CFooter>
  }
  return statusMap[status]
}

