'use strict'

import React from 'react'
import { render } from 'react-dom'

import Dashboard from './Dashboard.jsx'
// // is there a better way of doing this?

// waiting for dom to load before booting react. we could alternatively
// put the index.js reference at the end fo the index.html, but i prefer this way.
document.addEventListener('DOMContentLoaded', () => {
  var mount = document.getElementById('react-mount')
  render(
    <Dashboard />,
      mount
    )
})
