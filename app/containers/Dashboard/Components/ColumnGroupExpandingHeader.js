import React from 'react'

// Header component to be used as default for all the columns.
export default class ColumnGroupExpandingHeader extends React.Component {
  constructor (props) {
    super(props)
    this.props.columnGroup.getOriginalColumnGroup().addEventListener('expandedChanged', this.onExpandChanged.bind(this))
    this.state = {
      expanded: null
    }
    this.onExpandChanged()
  }

  render () {
    let arrowClassName = 'customExpandButton ' + (this.state.expanded ? ' expanded' : ' collapsed')

    return <div>
      <div className='customHeaderLabel'> {this.props.displayName}</div>
      <div className={arrowClassName} onClick={this.expandOrCollapse.bind(this)}>
        <i className='material-icons'>chevron_right</i>
      </div>
    </div>
  }

  expandOrCollapse () {
    this.props.setExpanded(!this.state.expanded)
  };

  onExpandChanged () {
    this.setState({
      expanded: this.props.columnGroup.getOriginalColumnGroup().isExpanded()
    })
  }
}

// the grid will always pass in one props called 'params',
// which is the grid passing you the params for the cellRenderer.
// this piece is optional. the grid will always pass the 'params'
// props, so little need for adding this validation meta-data.
ColumnGroupExpandingHeader.propTypes = {
  params: React.PropTypes.object
}
