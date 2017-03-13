import React from 'react'

// Header component to be used as default for all the columns.
export default class ColumnHeader extends React.Component {
  constructor (props) {
    super(props)
    this.props.column.addEventListener('sortChanged', this.onSortChanged.bind(this))
    // The state of this component contains the current sort state of this column
    // The possible values are: 'asc', 'desc' and ''
    this.state = {
      sorted: ''
    }
  }

  render () {
    let sortElements = []
    if (this.props.enableSorting) {
      let downArrowClass = 'customSortDownLabel ' + (this.state.sorted === 'desc' ? ' active' : '')
      let upArrowClass = 'customSortUpLabel ' + (this.state.sorted === 'asc' ? ' active' : '')
      sortElements.push(<div className={downArrowClass} onClick={this.onSortRequested.bind(this, 'desc')}><i className='material-icons'>arrow_downward</i></div>)
      sortElements.push(<div className={upArrowClass} onClick={this.onSortRequested.bind(this, 'asc')}><i className='material-icons'>arrow_upward</i></div>)
    }

    let menuButton = null
    if (this.props.enableMenu) {
      menuButton = <div ref='menuButton' className='customHeaderMenuButton' onClick={this.onMenuClick.bind(this)}><i className='material-icons'>menu</i></div>
    }

    return <div>
      {menuButton}
      <div className='customHeaderLabel'>{this.props.displayName}</div>
      {sortElements}
    </div>
  }

  onSortRequested (order, event) {
    this.props.setSort(order, event.shiftKey)
  };

  onSortChanged () {
    if (this.props.column.isSortAscending()) {
      this.setState({
        sorted: 'asc'
      })
    } else if (this.props.column.isSortDescending()) {
      this.setState({
        sorted: 'desc'
      })
    } else {
      this.setState({
        sorted: ''
      })
    }
  };

  onMenuClick () {
    this.props.showColumnMenu(this.refs.menuButton)
  };

}
