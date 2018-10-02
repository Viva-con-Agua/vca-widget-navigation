export default class Sorting {

  constructor (type) {
    this.type = type
    this.sortDir = 'ASC'
    this.sortField = 'Supporter_firstName'
    this.fields = {
      'widgets': [
        {
          'label': 'Vorname',
          'value': 'Supporter_firstName'
        },
        {
          'label': 'Nachname',
          'value': 'Supporter_lastName'
        },
        {
          'label': 'Email',
          'value': 'Profile_email'
        },
        {
          'label': 'Dabei seid',
          'value': 'User_created'
        },
        {
          'label': 'Wohnort',
          'value': 'Supporter_placeOfResidence'
        }
      ],
      'table': [
        {
          'label': 'Vorname',
          'value': 'Supporter_firstName'
        },
        {
          'label': 'Nachname',
          'value': 'Supporter_lastName'
        },
        {
          'label': 'Email',
          'value': 'Profile_email'
        },
        {
          'label': 'Dabei seid',
          'value': 'User_created'
        },
        {
          'label': 'Handynummer',
          'value': 'Supporter_mobilePhone'
        },
        {
          'label': 'Alter',
          'value': 'Supporter_birthday'
        },
        {
          'label': 'Geschlecht',
          'value': 'Supporter_sex'
        }
      ]
    }
    this.setFields()
    this.currentSelected = this.current.filter((field) => field.value === this.sortField).pop()
  }

  toJSONRequest () {
    return { 'attributes': [this.sortField], 'dir': this.sortDir }
  }

  setDir (dir) {
    this.sortDir = dir
  }

  setField (field) {
    this.sortField = field
  }

  setType (type) {
    this.type = type
    this.setFields()
  }

  getCurrentField () {
    return this.currentSelected
  }

  setFields () {
    var fields = this.fields['widgets']
    if (this.type === 'tableRow') {
      fields = this.fields['table']
    }
    this.current = fields
  }

  getFields () {
    return this.current
  }

  is (dir) {
    var res = false
    if (this.sortDir === dir) {
      res = true
    }
    return res
  }
}
