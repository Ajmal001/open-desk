import React from 'react'
import {
  AgGridReact
} from 'ag-grid-react'

import RowDataFactory from './Data/RowDataFactory'
import ColDefFactory from './Data/ColDefFactory'

import ColumnHeader from './Components/ColumnHeader'
import DateEditor from './Editor/DateEditor'

import Button from 'react-md/lib/Buttons/Button'

import NavigationDrawer from 'react-md/lib/NavigationDrawers'
import Autocomplete from 'react-md/lib/Autocompletes'

import RefData from './Data/RefData'

export default class Dashboard extends React.Component {
  constructor () {
    super()
    this.state = {
      quickFilterText: '',
      searching: false,
      showGrid: true,
      showToolPanel: false,
      columnDefs: new ColDefFactory().createColDefs(),
      rowData: new RowDataFactory().createRowData(),
      icons: {
        menu: '<i class="material-icons>menu</i>',
        filter: '<i class="material-icons">filter_list</i>',
        sortAscending: '<i class="material-icons">arrow_drop_down</i>',
        sortDescending: '<i class="material-icons">arrow_drop_up</i>'
      }
    }
    /* the grid options are optional, because you can provide every property
    to the grid via standard React properties. however, the react interface
    doesn't block you from using the standard JavaScript interface if you
    wish. Maybe you have the gridOptions stored as JSON on your server? If
    you do, the providing the gridOptions as a standalone object is just
    what you want!
    */
    this.gridOptions = {
      floatingFilter: true,
      defaultColDef: {
        suppressMenu: true,
        headerComponentFramework: ColumnHeader,
        headerComponentParams: {
          menuIcon: '<i class="material-icons>menu</i>'
        },
        dateComponentFramework: DateEditor
      },
      rowBuffer: 10 // no need to set this, the default is fine for almost all scenarios
    }
    this._showSearch = this._showSearch.bind(this)
    this._hideSearch = this._hideSearch.bind(this)
    this._resetSearch = this._resetSearch.bind(this)
  }
  onShowGrid (show) {
    this.setState({
      showGrid: show
    })
  }
  onGridReady (params) {
    this.api = params.api
    this.columnApi = params.columnApi
  }

  onQuickFilterText (value) {
    this.setState({
      quickFilterText: value
    })
  }
  _showSearch () {
    this.setState({ searching: true })
  }
  _hideSearch () {
    this.setState({ searching: false })
  }
  _resetSearch () {
    this.setState({ searching: false, quickFilterText: '' })
  }

  onRefreshData () {
    var newRowData = new RowDataFactory().createRowData()
    this.setState({
      rowData: newRowData
    })
  }
  render () {
    // let title
    let actions
    let children
    if (this.state.searching) {
      // nav = <Button onClick={this._hideSearch} icon>arrow_back</Button>
      actions = <Button onClick={this._resetSearch} icon>close</Button>
      children = (
        <Autocomplete
          id='quick-filter'
          placeholder='Quick Search...'
          block paddedBlock={false}
          autoFocus
          data={RefData.AUTOCOMPLETES}
          value={this.state.quickFilterText}
          onAutocomplete={this.onQuickFilterText.bind(this)}
          onChange={this.onQuickFilterText.bind(this)}
          className='md-title--toolbar'
          inputClassName='md-text-field--toolbar'
            />
          )
    } else {
          // title = 'Pastries';
          // nav = <Button icon>menu</Button>;
      actions = [
        // <Button disabled icon style={{color: '#FF6D00'}} >error</Button>,
        // <Button disabled icon style={{color: '#FFD600'}} >file_download</Button>,
        // <Button disabled icon style={{color: '#00c853'}} >note_add</Button>,
        <Button icon style={{color: '#6200EA'}} onClick={this.onRefreshData.bind(this)}>sync</Button>,
        <Button icon >clear</Button>,
        <Button icon onClick={this._showSearch} >search</Button>
      ]
    }

    return (
      <div>
        <NavigationDrawer
          toolbarTitle='Case Stroke | open case manager'
          toolbarActions={actions}
          toolbarChildren={children}
          mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          tabletDrawerType={NavigationDrawer.DrawerTypes.FLOATING}
          desktopDrawerType={NavigationDrawer.DrawerTypes.FLOATING}
          drawerTitle='Chat Room'
          navItems={[<span>This will eventually be a chat</span>]}
    >
          <div id='ag-grid-container' className='ag-material'>
            <AgGridReact
          // gridOptions is optional - it's possible to provide
          // all values as React props
              gridOptions={this.gridOptions}
          // listening for events
              onGridReady={this.onGridReady.bind(this)}
          // binding to simple properties
              quickFilterText={this.state.quickFilterText}
          // binding to an object property
              icons={this.state.icons}
          // binding to array properties
              columnDefs={this.state.columnDefs}
              rowData={this.state.rowData}
          // no binding, just providing hard coded strings for the properties
              suppressRowClickSelection
              rowSelection='multiple'
              enableColResize
              enableSorting
              enableFilter
              groupHeaders
              headerHeight='32'
              rowHeight='48'
          />
          </div>
        </NavigationDrawer>
      </div>
    )
  }

}

/*
<Button icon primary onClick={this.onRefreshData.bind(this)}>sync</Button>
<Button icon primary>file_download</Button>
<Button icon primary>error</Button>
<Button floating secondary>note_add</Button>
<TextField id='floatingCenterTitle'
  onChange={this.onQuickFilterText.bind(this)}
  label='Master Search...'
  lineDirection='center'
  className='md-cell md-cell--bottom'
/>
*/
