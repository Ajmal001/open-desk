import React from 'react'

import DatePicker from 'react-md/lib/Pickers/DatePickerContainer'

// Date Component to be used in the date filter.
// This is a very simple example of how a React component can be plugged as a DateComponentFramework
// as you can see, the only requirement is that the React component implements the required methods
// getDate and setDate and that it calls back into props.onDateChanged every time that the date changes.
export default class DateEditor extends React.Component {

  constructor (props) {
    super(props)
    // The state of this component is represented of:
    //  The current date it holds, null by default, null if the date typed by the user is not valid or fields are blank
    //  The current values that the user types in the input boxes, by default ''

    // The textBoxes state is necessary since it can be set from ag-Grid. This can be seen in this example through
    // the usage of the button DOB equals to 01/01/2000 in the example page.
    this.state = {
      date: null,
      textBoxes: {
        dd: '',
        mm: '',
        yyyy: ''
      }
    }
  }

  render () {
    return (
      <DatePicker
        id='inlineCenter'
        lineDirection='center'
        className='md-cell'
    />
    )
  }
  /*
  <div style={filterStyle}>
    <span style={resetStyle} onClick={this.resetDate.bind(this)}>x</span>
    {this.state.textBoxes &&
    <input onInput={this.onDateChanged.bind(this)} ref='dd' placeholder='dd' style={ddStyle} value={this.state.textBoxes.dd} maxLength='2' />/
            <input onInput={this.onDateChanged.bind(this)} ref='mm' placeholder='mm' style={mmStyle} value={this.state.textBoxes.mm} maxLength='2' />/
            <input onInput={this.onDateChanged.bind(this)} ref='yyyy' placeholder='yyyy' style={yyyyStyle} value={this.state.textBoxes.yyyy} maxLength='4' />
    }
  </div>
  */

  //* ********************************************************************************
  //          METHODS REQUIRED BY AG-GRID
  //* ********************************************************************************

  getDate () {
    // ag-grid will call us here when in need to check what the current date value is hold by this
    // component.
    let temp = this.state.date ? this.state.date : false
    return temp
  }

  setDate (date) {
    // ag-grid will call us here when it needs this component to update the date that it holds.
    if (date) {
      this.setState({
        date: date,
        textBoxes: {
          dd: date.getDate(),
          mm: date.getMonth() + 1,
          yyyy: date.getFullYear()
        }
      })
    }
  }

  //* ********************************************************************************
  //          LINKS THE INTERNAL STATE AND AG-GRID
  //* ********************************************************************************

  updateAndNotifyAgGrid (date, textBoxes) {
    this.setState({
      date: date,
      textBoxes: textBoxes
    },
      // Callback after the state is set. This is where we tell ag-grid that the date has changed so
      // it will proceed with the filtering and we can then expect ag-Grid to call us back to getDate
      this.props.onDateChanged
    )
  }

  //* ********************************************************************************
  //          LINKING THE UI, THE STATE AND AG-GRID
  //* ********************************************************************************

  resetDate () {
    let date = null
    let textBoxes = {
      dd: '',
      mm: '',
      yyyy: ''
    }

    this.updateAndNotifyAgGrid(date, textBoxes)
  }

  onDateChanged () {
    let date = this.parseDate(this.refs.dd.value, this.refs.mm.value, this.refs.yyyy.value)
    let textBoxes = {
      dd: this.refs.dd.value,
      mm: this.refs.mm.value,
      yyyy: this.refs.yyyy.value
    }

    this.updateAndNotifyAgGrid(date, textBoxes)
  }

  //* ********************************************************************************
  //          INTERNAL LOGIC
  //* ********************************************************************************

  parseDate (dd, mm, yyyy) {
    // If any of the three input date fields are empty, stop and return null
    if (dd.trim() === '' || mm.trim() === '' || yyyy.trim() === '') {
      return null
    }

    let day = Number(dd)
    let month = Number(mm)
    let year = Number(yyyy)

    let date = new Date(year, month - 1, day)

    // If the date is not valid
    if (isNaN(date.getTime())) {
      return null
    }

    // Given that new Date takes any garbage in, it is possible for the user to specify a new Date
    // like this (-1, 35, 1) and it will return a valid javascript date. In this example, it will
    // return Sat Dec 01    1 00:00:00 GMT+0000 (GMT) - Go figure...
    // To ensure that we are not letting non sensical dates to go through we check that the resultant
    // javascript date parts (month, year and day) match the given date fields provided as parameters.
    // If the javascript date parts don't match the provided fields, we assume that the input is non
    // sensical... ie: Day=-1 or month=14, if this is the case, we return null
    // This also protects us from non sensical dates like dd=31, mm=2 of any year
    if (date.getDate() !== day || date.getMonth() + 1 !== month || date.getFullYear() !== year) {
      return null
    }

    return date
  }
}

// the grid will always pass in one props called 'params',
// which is the grid passing you the params for the cellRenderer.
// this piece is optional. the grid will always pass the 'params'
// props, so little need for adding this validation meta-data.
DateEditor.propTypes = {
  params: React.PropTypes.object
}