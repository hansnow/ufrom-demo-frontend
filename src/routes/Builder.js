import React, { useState } from 'react'
import Builder from '@uform/builder-next'
import { Button, Modal, Input, message } from 'antd'
import '@alifd/next/dist/next.css'

import { add } from '../services'

function SaveModal({ visible, onCancel }) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const submit = async () => {
    if (!name) return message.error('必须取名字，怕你到时候认不出来谁是谁')
    setLoading(true)
    try {
      const schema = JSON.parse(window.monacoInstance.getValue())
      await add(name, schema)
      message.success('保存成功')
      onCancel()
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }
  return (
    <Modal
      title="取个名字吧"
      maskClosable={false}
      visible={visible}
      onCancel={onCancel}
      onOk={submit}
      confirmLoading={loading}
      afterClose={() => setName('')}
    >
      <Input value={name} onChange={e => setName(e.target.value)} />
    </Modal>
  )
}

function FormBuilder() {
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <SaveModal visible={visible} onCancel={() => setVisible(false)} />
      <div style={{ marginBottom: 8 }}>
        <Button type="primary" onClick={() => setVisible(true)}>
          真正的保存
        </Button>
      </div>
      <Builder />
    </div>
  )
}

export default FormBuilder
