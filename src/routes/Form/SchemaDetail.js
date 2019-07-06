import React, { useState, useEffect } from 'react'
import { Collapse } from 'antd'
import SchemaForm from '@uform/antd'
import { get } from '../../services'

//{ type: 'object' }

function SchemaDetail({ match }) {
  const [schema, setSchema] = useState({
    schema: { schema: { type: 'object' } }
  })
  const [loading, setLoading] = useState(false)
  const fetchData = async () => {
    setLoading(true)
    try {
      const { result: schema } = await get(match.params.id)
      setSchema(schema)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [match])
  return (
    <div>
      <SchemaForm schema={schema.schema.schema} />
      <Collapse>
        <Collapse.Panel header="Schema详情">
          <pre>{JSON.stringify(schema, null, 2)}</pre>
        </Collapse.Panel>
      </Collapse>
    </div>
  )
}

export default SchemaDetail
