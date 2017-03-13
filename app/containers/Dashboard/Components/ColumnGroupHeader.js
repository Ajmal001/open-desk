import React from 'react'

// Header component to be used as default for all the columns.
export default class ColumnGroupExpandingHeader extends React.Component {
  render () {
    return (
      <div>
        <div className='customHeaderLabel'> {this.props.displayName}</div>
      </div>
    )
  }
}
