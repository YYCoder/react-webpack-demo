import React from 'react'
import { Card } from 'antd-mobile'
// 导入自定义组件
import ItemFooter from '../item-footer'

export default function Item(props) {
  const CBody = Card.Body
  const CHeader = Card.Header
  const { data: { id, name, content, status } } = props

  return (
    <Card>
      <CHeader title={name}></CHeader>
      <CBody>
        {content}
      </CBody>
      <ItemFooter status={status} data={props.data} />
    </Card>
  )
}
