import React from 'react'
import { render } from 'react-dom'

import Dashboard from './containers/Dashboard/Dashboard'

if (process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf')
}
render(
  <Dashboard />
  , document.getElementById('app')
)
//  Add a route: <Route path='about' component={About} />
