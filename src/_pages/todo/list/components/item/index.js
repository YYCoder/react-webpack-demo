import React from 'react'
import { Card } from 'antd-mobile'
// 导入自定义组件
import ItemFooter from '../item-footer'

export default function Item(data) {
  const CBody = Card.Body
  const CHeader = Card.Header
  const { id, name, content, status } = data

  return (
    <Card>
      <CHeader title={name}></CHeader>
      <CBody>
        {content}
      </CBody>
      <ItemFooter status={status} data={data} />
    </Card>
  )
}
