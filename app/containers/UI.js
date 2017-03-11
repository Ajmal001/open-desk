import React, { Component } from 'react'

import Sidebar from 'react-sidebar'
// import NavigationDrawer from 'react-md/lib/NavigationDrawers'
// import Sidebar from './Sidebar'
import Dashboard from './Dashboard'

//  Initialize Firebase with re(act)-firebase
import Firebase from '../firebase'

class UI extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      cases: [],
      chat: [],
      user: false,
      sidebarOpen: false,
      sidebarDocked: false
    }
    this.auth = this.auth.bind(this)
    this.unauth = this.unauth.bind(this)
  }

  componentWillMount () {
    Firebase.syncState(`cases`, {
      context: this,
      state: 'cases',
      asArray: true
    })
    Firebase.syncState(`chat`, {
      context: this,
      state: 'chat'
      // asArray: true
    })

    var mql = window.matchMedia(`(min-width: 800px)`)
    mql.addListener(this.mediaQueryChanged)
    this.setState({mql: mql, sidebarDocked: mql.matches})
  }
  componentWillUnmount () {
    this.state.mql.removeListener(this.mediaQueryChanged)
  }

  mediaQueryChanged () {
    this.setState({sidebarDocked: this.state.mql.matches})
  }

  auth () {
    //  oAuth returns {user: {credentials: ..., user: {}}}, thus the user.user prop
    let authHandler = (error, user) => !error ? this.setState({user: user.user}) : console.log('Error', error)
    Firebase.authWithOAuthPopup('google', authHandler)
    // this.setState({user: user})
  }
  unauth () {
    Firebase.unauth()
    this.setState({user: false})
  }

  render () {
    return (
      <div>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <Sidebar sidebar={<b>Content</b>}
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          pullRight
          >
          <Dashboard />
        </Sidebar>
      </div>
    )
  }

}

export default UI
