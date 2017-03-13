import RefData from './RefData'

export default class RowDataFactory {

  createRowData () {
    var rowData = []

    for (var i = 0; i < 200; i++) {
      // type, number, client, title, priority, state, team, member, notes, updated, created
      rowData.push({
        type: RefData.TYPE[Math.floor(Math.random() * RefData.TYPE.length)],
        number: RefData.NUMBER[Math.floor(Math.random() * RefData.NUMBER.length)],
        client: RefData.CLIENT[Math.floor(Math.random() * RefData.CLIENT.length)],
        title: RefData.TITLE[Math.floor(Math.random() * RefData.TITLE.length)],
        priority: RefData.PRIORITY[Math.floor(Math.random() * RefData.PRIORITY.length)],
        state: RefData.STATE[Math.floor(Math.random() * RefData.STATE.length)],
        team: RefData.TEAM[Math.floor(Math.random() * RefData.TEAM.length)],
        member: RefData.MEMBER[Math.floor(Math.random() * RefData.MEMBER.length)],
        notes: RefData.NOTES[Math.floor(Math.random() * RefData.NOTES.length)],
        updated: RefData.UPDATED[i % RefData.DOB.length],
        created: RefData.CREATED[i % RefData.DOB.length]
      })
    }
    //   var countryData = RefData.COUNTRIES[i % RefData.COUNTRIES.length]
    //   rowData.push({
    //     name: RefData.FIRST_NAMES[i % RefData.FIRST_NAMES.length] + ' ' + RefData.LAST_NAMES[i % RefData.LAST_NAMES.length],
    //     skills: {
    //       android: Math.random() < 0.4,
    //       html5: Math.random() < 0.4,
    //       mac: Math.random() < 0.4,
    //       windows: Math.random() < 0.4,
    //       css: Math.random() < 0.4
    //     },
    //     dob: RefData.DOB[i % RefData.DOB.length],
    //     address: RefData.ADDRESSES[i % RefData.ADDRESSES.length],
    //     years: Math.round(Math.random() * 100),
    //     proficiency: Math.round(Math.random() * 100),
    //     country: countryData.country,
    //     continent: countryData.continent,
    //     language: countryData.language,
    //     mobile: this.createRandomPhoneNumber(),
    //     landline: this.createRandomPhoneNumber()
    //   })
    // }

    return rowData
  }

  createRandomPhoneNumber () {
    var result = '+'
    for (var i = 0; i < 12; i++) {
      result += Math.round(Math.random() * 10)
      if (i === 2 || i === 5 || i === 8) {
        result += ' '
      }
    }
    return result
  }

}
