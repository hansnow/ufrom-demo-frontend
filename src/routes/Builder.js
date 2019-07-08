import React, { useState } from 'react'
import Builder from '@uform/builder-next'
import { Button, Modal, Input, Form, message } from 'antd'
import '@alifd/next/dist/next.css'

import { add } from '../services'

function FormItem(props) {
  return (
    <Form.Item wrapperCol={{ span: 16 }} labelCol={{ span: 6 }} {...props} />
  )
}

function SaveModal({ visible, onCancel, form }) {
  const [loading, setLoading] = useState(false)
  const { getFieldDecorator, validateFields, resetFields } = form
  const submit = () => {
    validateFields(async (err, fields) => {
      if (err) return message.error('请按要求填表单')
      setLoading(true)
      try {
        const schema = JSON.parse(window.monacoInstance.getValue())
        await add(fields.name, fields.url, schema.schema)
        message.success('保存成功')
        onCancel()
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    })
  }
  return (
    <Modal
      title="完善信息"
      maskClosable={false}
      visible={visible}
      onCancel={onCancel}
      onOk={submit}
      confirmLoading={loading}
      afterClose={() => resetFields()}
    >
      <FormItem label="名字">
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: '必须取名字，不然到时候认不出来谁是谁'
            }
          ]
        })(<Input placeholder="名字" />)}
      </FormItem>
      <FormItem label="提交到">
        {getFieldDecorator('url', {
          initialValue: 'https://httpbin.org/post',
          rules: [{ required: true, message: '提交到的URL必填' }]
        })(<Input />)}
      </FormItem>
    </Modal>
  )
}

const WrappedSaveModal = Form.create()(SaveModal)

function FormBuilder() {
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <WrappedSaveModal visible={visible} onCancel={() => setVisible(false)} />
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
