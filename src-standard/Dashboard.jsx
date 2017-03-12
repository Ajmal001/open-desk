import React from 'react'
import {AgGridReact} from 'ag-grid-react'
import RowDataFactory from './RowDataFactory'
import ColDefFactory from './ColDefFactory.jsx'
import MyReactDateComponent from './MyReactDateComponent.jsx'
import MyReactHeaderComponent from './MyReactHeaderComponent.jsx'

import './manifest.css'

export default class Dashboard extends React.Component {

  constructor () {
    super()

    this.state = {
      quickFilterText: null,
      showGrid: true,
      showToolPanel: false,
      columnDefs: new ColDefFactory().createColDefs(),
      rowData: new RowDataFactory().createRowData(),
      icons: {
        // columnRemoveFromGroup: '<i class="material-icons">cancel</i>',
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
      // We register the react date component that ag-grid will use to render
      dateComponentFramework: MyReactDateComponent,
      // this is how you listen for events using gridOptions
      defaultColDef: {
        headerComponentFramework: MyReactHeaderComponent,
        headerComponentParams: {
          menuIcon: 'fa-bars'
        }
      },
      // this is a simple property
      rowBuffer: 10 // no need to set this, the default is fine for almost all scenarios
    }
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
  onQuickFilterText (event) {
    this.setState({quickFilterText: event.target.value})
  }

  onRefreshData () {
    var newRowData = new RowDataFactory().createRowData()
    this.setState({
      rowData: newRowData
    })
  }
  render () {
    let toolbar = (
      <div>
        <input type='text' placeholder='Filter...'
          onChange={this.onQuickFilterText.bind(this)}
          />
        <button onClick={this.onRefreshData.bind(this)}>
            Generate Dataset
          </button>
        <button id='btDestroyGrid' disabled={!this.state.showGrid}
          onClick={this.onShowGrid.bind(this, false)}>
            Destroy Grid
          </button>
        <button id='btCreateGrid' disabled={this.state.showGrid}
          onClick={this.onShowGrid.bind(this, true)}>
            Create Grid
          </button>
      </div>
        )

    return <div>
      {toolbar}
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
          rowHeight='48'
          />
      </div>
    </div>
  }

}
