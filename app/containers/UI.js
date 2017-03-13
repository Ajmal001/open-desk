import React from 'react'

import NavigationDrawer from 'react-md/lib/NavigationDrawers';

import Dashboard from './Dashboard/Dashboard'

export default class UI extends React.Component {
  render () {
    return (
    <NavigationDrawer
      // navItems={NavItems}
      mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
      tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT}
      desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT}
      toolbarTitle='Toolbar'
      drawerTitle='Navigation'
    >
      <Dashboard />
    </NavigationDrawer>
)
  }
}
