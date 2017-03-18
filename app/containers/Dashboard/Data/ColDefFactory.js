import RefData from './RefData'

import ColumnHeader from '../Components/ColumnHeader'
import ColumnGroupHeader from '../Components/ColumnGroupHeader'
import ColumnGroupExpandingHeader from '../Components/ColumnGroupExpandingHeader'

// import SkillsFilter from '../Filter/SkillsFilter'
// import ProficiencyFilter from '../Filter/ProficiencyFilter'

// import ProficiencyFormatter from '../Formatter/ProficiencyFormatter'
// import SkillsFormatter from '../Formatter/SkillsFormatter'

import StringFilter from '../Filter/StringFilter'

import StringEditor from '../Editor/StringEditor'
import SelectEditor from '../Editor/SelectEditor'
// import DateEditor from '../Editor/DateEditor'
/*

Case:
Client, Type, Number, Title -> Asset, Asset Tag
Status:
State -> Group, Member
Details:
Description -> Last updated

Master-Detail rows
Details should include ticket history.

*/

export default class ColDefFactory {
  createColDefs () {
    var columnDefs = [
      {
        headerName: 'Case',
        headerGroupComponentFramework: ColumnGroupHeader,
        children: [
          {
            headerName: '',
            width: 40,
            pinned: true,
            checkboxSelection: true,
            suppressSorting: true,
            // filter: 'checkbox',
            suppressFilter: true
          }, {
            headerName: 'Type',
            field: 'type',
            enableRowGroup: true,
            width: 75,
            pinned: true,
            cellEditorFramework: SelectEditor
          }, {
            headerName: 'Number',
            field: 'number',
            enableRowGroup: true,
            width: 95,
            pinned: true,
            editable: false
          }]
      }, {
        headerName: 'Client',
        headerComponentFramework: ColumnHeader,
        field: 'client',
        enableRowGroup: true,
        width: 120,
        cellEditorFramework: StringEditor
            // filterFramework: StringFilter
      }, {
        headerName: 'Title',
        headerComponentFramework: ColumnGroupHeader,
        field: 'title',
        enableRowGroup: true,
        width: 250,
        suppressSorting: true,
        // use a React cellEditor
        editable: true,
        cellEditorFramework: StringEditor
      },
      {
        headerName: 'Status',
        headerGroupComponentFramework: ColumnGroupExpandingHeader,
        children: [{
          headerName: 'Priority',
          field: 'priority',
          enableRowGroup: true,
          width: 100,
          cellEditorFramework: SelectEditor
        }, {
          headerName: 'State',
          field: 'state',
          enableRowGroup: true,
          width: 100,
          cellEditorFramework: SelectEditor
        }, {
          headerName: 'Team',
          field: 'team',
          enableRowGroup: true,
          width: 120,
        // use a React cellEditor
          editable: true,
          cellEditorFramework: SelectEditor,
          columnGroupShow: 'open'
        }, {
          headerName: 'Member',
          field: 'member',
          enableRowGroup: true,
          width: 120,
        // use a React cellEditor
          editable: true,
          cellEditorFramework: StringEditor,
          columnGroupShow: 'open'
        }]
      },
      {
        headerName: 'Details',
        headerGroupComponentFramework: ColumnGroupExpandingHeader,
        children: [{
          headerName: 'Notes',
          field: 'notes',
          width: 350,
          enableRowGroup: true,
          // use a React cellEditor
          cellEditorFramework: StringEditor,
          suppressSorting: true
        }, {
          headerName: 'Updated',
          field: 'updated',
          width: 100,
          enableRowGroup: true,
          filter: 'date',
          suppressFilter: true,
          editable: false,
          cellRenderer: function (params) {
            return pad(params.value.getDate(), 2) + '/' +
              pad(params.value.getMonth() + 1, 2) + '/' +
              params.value.getFullYear()
          },
          columnGroupShow: 'open'
        }, {
          headerName: 'Created',
          field: 'created',
          width: 100,
          enableRowGroup: true,
          filter: 'date',
          suppressFilter: true,
          editable: false,
          cellRenderer: function (params) {
            return pad(params.value.getDate(), 2) + '/' +
              pad(params.value.getMonth() + 1, 2) + '/' +
              params.value.getFullYear()
          },
          columnGroupShow: 'open'
        }]
      }
    ]
    return columnDefs
  }
}
//
// // this is a simple cell renderer, putting together static html, no
// // need to use React for it.
// function countryCellRenderer (params) {
//   if (params.value) {
//     var flag = "<img border='0' width='15' height='10' " +
//       "style='margin-bottom: 2px' src='http://flags.fmcdn.net/data/flags/mini/" +
//       RefData.COUNTRY_CODES[params.value] + ".png'>"
//     return flag + ' ' + params.value
//   } else {
//     return null
//   }
// }

// Utility function used to pad the date formatting.
function pad (num, totalStringSize) {
  let asString = num + ''
  while (asString.length < totalStringSize) asString = '0' + asString
  return asString
}
