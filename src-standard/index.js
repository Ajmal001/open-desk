'use strict'

import ReactDOM from 'react-dom'
import React from 'react'
import Dashboard from './Dashboard.jsx'
// // is there a better way of doing this?

// waiting for dom to load before booting react. we could alternatively
// put the index.js reference at the end fo the index.html, but i prefer this way.
document.addEventListener('DOMContentLoaded', () => {
  var container = document.getElementById('myAppContainer')
  ReactDOM.render(
        React.createElement(Dashboard),
        container
    )
})
