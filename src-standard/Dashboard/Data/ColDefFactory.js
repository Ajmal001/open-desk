import RefData from './RefData'

import ColumnGroupHeader from '../Components/ColumnGroupHeader'

import SkillsFilter from '../Filter/SkillsFilter'
import ProficiencyFilter from '../Filter/ProficiencyFilter'

import ProficiencyFormatter from '../Formatter/ProficiencyFormatter'
import SkillsFormatter from '../Formatter/SkillsFormatter'

import StringEditor from '../Editor/StringEditor'

export default class ColDefFactory {

  createColDefs () {
    var columnDefs = [{
      headerName: '#',
      width: 30,
      checkboxSelection: true,
      suppressSorting: true,
      suppressMenu: true,
      pinned: true
    },
      {
        headerName: 'Employee',
        headerGroupComponentFramework: ColumnGroupHeader,
        children: [{
          headerName: 'Name',
          field: 'name',
          enableRowGroup: true,
          enablePivot: true,
          width: 150,
          pinned: true,
          editable: true,
          // use a React cellEditor
          cellEditorFramework: StringEditor
        }, {
          headerName: 'Country',
          field: 'country',
          width: 150,
          enableRowGroup: true,
          enablePivot: true,
          // an example of using a non-React cell renderer
          cellRenderer: countryCellRenderer,
          pinned: true,
          filterParams: {
            cellRenderer: countryCellRenderer,
            cellHeight: 20
          },
          columnGroupShow: 'open'
        }, {
          headerName: 'DOB',
          field: 'dob',
          width: 110,
          enableRowGroup: true,
          enablePivot: true,
          filter: 'date',
          pinned: true,
          cellRenderer: function (params) {
            return pad(params.value.getDate(), 2) + '/' +
              pad(params.value.getMonth() + 1, 2) + '/' +
              params.value.getFullYear()
          },
          columnGroupShow: 'open'
        }]
      },
      {
        headerName: 'IT Skills',
        children: [{
          headerName: 'Skills',
          width: 125,
          suppressSorting: true,
          field: 'skills',
          enableRowGroup: true,
          enablePivot: true,
            // supply a React component
          cellRendererFramework: SkillsFormatter,
            // supply a React component
          filterFramework: SkillsFilter
        },
          {
            headerName: 'Proficiency',
            field: 'proficiency',
            width: 135,
            enableValue: true,
            // supply a React component
            cellRendererFramework: ProficiencyFormatter,
            // supply a React component
            filterFramework: ProficiencyFilter
          }
        ]
      },
      {
        headerName: 'Contact',
        children: [{
          headerName: 'Mobile',
          field: 'mobile',
          width: 150,
          filter: 'text'
        },
          {
            headerName: 'Land-line',
            field: 'landline',
            width: 150,
            filter: 'text'
          },
          {
            headerName: 'Address',
            field: 'address',
            width: 500,
            filter: 'text'
          }
        ]
      }
    ]
    return columnDefs
  }
}

// this is a simple cell renderer, putting together static html, no
// need to use React for it.
function countryCellRenderer (params) {
  if (params.value) {
    var flag = "<img border='0' width='15' height='10' " +
      "style='margin-bottom: 2px' src='http://flags.fmcdn.net/data/flags/mini/" +
      RefData.COUNTRY_CODES[params.value] + ".png'>"
    return flag + ' ' + params.value
  } else {
    return null
  }
}

// Utility function used to pad the date formatting.
function pad (num, totalStringSize) {
  let asString = num + ''
  while (asString.length < totalStringSize) asString = '0' + asString
  return asString
}
