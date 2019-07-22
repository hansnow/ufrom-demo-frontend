import React, { useState } from 'react'
import { LocaleProvider, Layout, Menu, Icon } from 'antd'
import zhCN from 'antd/es/locale-provider/zh_CN'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  withRouter
} from 'react-router-dom'

import Form from './routes/Form'
import Builder from './routes/Builder'
import UploadDemo from './routes/UploadDemo'

const { Header, Content, Footer, Sider } = Layout

function SiderMenu({ location }) {
  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname.split('/')[1]]}
    >
      <Menu.Item key="form">
        <Icon type="form" />
        <span>Form</span>
        <Link to="/form" />
      </Menu.Item>
      <Menu.Item key="builder">
        <Icon type="edit" />
        <span>Builder</span>
        <Link to="/builder" />
      </Menu.Item>
      <Menu.Item key="upload">
        <Icon type="upload" />
        <span>Upload</span>
        <Link to="/upload" />
      </Menu.Item>
    </Menu>
  )
}

SiderMenu = withRouter(SiderMenu)

function Index() {
  return <Redirect to="/form" />
}

function App() {
  const [collapsed, setCollapsed] = useState(false)
  const toggle = () => setCollapsed(!collapsed)
  return (
    <LocaleProvider locale={zhCN}>
      {/* <SchemaForm schema={schema} /> */}
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div className="logo">{collapsed ? 'D' : 'Demo'}</div>
            <SiderMenu />
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0, paddingLeft: 16 }}>
              <Icon
                className="trigger"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                style={{ cursor: 'pointer' }}
                onClick={toggle}
              />
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280
              }}
            >
              <Route path="/" exact component={Index} />
              <Route path="/form" component={Form} />
              <Route path="/builder" component={Builder} />
              <Route path="/upload" component={UploadDemo} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>Created by Xiaohan</Footer>
          </Layout>
        </Layout>
      </Router>
    </LocaleProvider>
  )
}

export default App
