import React from 'react'
import { Route } from 'react-router-dom'

import SchemaList from './SchemaList'
import SchemaDetail from './SchemaDetail'

function Form() {
  return (
    <>
      <Route path="/form" exact component={SchemaList} />
      <Route path="/form/:id" component={SchemaDetail} />
    </>
  )
}

export default Form
