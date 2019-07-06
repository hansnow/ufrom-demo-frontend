import React from 'react'
import { Card, Icon, message, Popconfirm } from 'antd'
import { Link } from 'react-router-dom'
import * as service from '../../services'

class SchemaList extends React.PureComponent {
  state = {
    loading: false,
    schemaList: []
  }
  fetchData = async () => {
    this.setState({ loading: true })
    try {
      const { result: schemaList } = await service.getList()
      this.setState({ schemaList })
    } catch (err) {
      console.log(err)
    }
    this.setState({ loading: false })
  }
  remove = async id => {
    try {
      await service.remove(id)
      message.success('Schema删除成功')
      this.fetchData()
    } catch (err) {
      console.log(err)
    }
  }
  componentDidMount() {
    this.fetchData()
  }
  render() {
    const { schemaList } = this.state
    return (
      <Card title="Schema List">
        {schemaList.map(s => (
          <Link key={s.id} to={'/form/' + s.id}>
            <Card.Grid
              style={{
                width: '25%',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <Popconfirm
                title="确定要删除该Schema吗？"
                onCancel={e => e.preventDefault()}
                onConfirm={e => {
                  e.preventDefault()
                  this.remove(s.id)
                }}
              >
                <Icon
                  type="delete"
                  style={{ position: 'absolute', top: 5, right: 5 }}
                />
              </Popconfirm>
              {s.name}
            </Card.Grid>
          </Link>
        ))}
      </Card>
    )
  }
}

export default SchemaList
