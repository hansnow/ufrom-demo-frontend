import React, { useState, useEffect } from 'react'
import { Collapse, Button, Modal, Spin, message } from 'antd'
import SchemaForm, { createAsyncFormActions } from '@uform/antd'
import _get from 'lodash/get'
import * as services from '../../services'

const actions = createAsyncFormActions()

// 修复__id__没起作用的问题
function translateResult(result, schema) {
  let ret = {}
  Object.keys(result).map(k => {
    const name = _get(schema, 'properties.' + k + '.__id__')
    if (name) {
      ret[name] = result[k]
    } else {
      ret[k] = result[k]
    }
  })
  return ret
}

function SchemaDetail({ match }) {
  const [schema, setSchema] = useState({ schema: { type: 'object' } })
  const [result, setResult] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const fetchData = async () => {
    setLoading(true)
    try {
      const { result: schema } = await services.get(match.params.id)
      setSchema(schema)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }
  const handleChange = a => {
    // trick
    setResult({ ...a })
  }
  const submit = async values => {
    const result = translateResult(values, schema.schema)
    setSubmitLoading(true)
    try {
      let { result: ret } = await services.submit(schema.id, result)
      ret = JSON.parse(ret)
      Modal.success({
        width: 700,
        title: 'POST ' + schema.url,
        content: <pre>{JSON.stringify(ret, null, 2)}</pre>
      })
    } catch (err) {
      message.error('提交表单时发生错误')
      console.log(err)
    }
    setSubmitLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [match])
  return (
    <div>
      <Collapse defaultActiveKey={['preview', 'result']}>
        <Collapse.Panel key="preview" header="表单预览">
          {loading ? (
            <Spin spinning={true} size="large" />
          ) : (
            <>
              <Button
                type="primary"
                onClick={() => actions.submit()}
                loading={submitLoading}
              >
                提交
              </Button>
              <SchemaForm
                actions={actions}
                schema={schema.schema}
                onSubmit={submit}
                onChange={handleChange}
              />
            </>
          )}
        </Collapse.Panel>
        <Collapse.Panel key="result" header="表单结果">
          <pre>
            {JSON.stringify(translateResult(result, schema.schema), null, 2)}
          </pre>
        </Collapse.Panel>
        <Collapse.Panel key="schema" header="Schema详情">
          <pre>{JSON.stringify(schema, null, 2)}</pre>
        </Collapse.Panel>
      </Collapse>
    </div>
  )
}

export default SchemaDetail
