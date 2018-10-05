export default class Sorting {

  constructor (type, i18n) {
    this.type = type
    this.sortDir = 'ASC'
    this.sortField = 'Supporter_firstName'
    this.fields = Sorting.generateFields(i18n)
    this.setFields()
    this.currentSelected = this.current.filter((field) => field.value === this.sortField).pop()
  }

  static generateFields (i18n) {
    return {
      'widgets': [
        {
          'label': i18n.t("label.sorting.fields.firstName"),
          'value': 'Supporter_firstName'
        },
        {
          'label': i18n.t("label.sorting.fields.lastName"),
          'value': 'Supporter_lastName'
        },
        {
          'label': i18n.t("label.sorting.fields.email"),
          'value': 'Profile_email'
        },
        {
          'label': i18n.t("label.sorting.fields.since"),
          'value': 'User_created'
        },
        {
          'label': i18n.t("label.sorting.fields.residence"),
          'value': 'Supporter_placeOfResidence'
        }
      ],
      'table': [
        {
          'label': i18n.t("label.sorting.fields.firstName"),
          'value': 'Supporter_firstName'
        },
        {
          'label': i18n.t("label.sorting.fields.lastName"),
          'value': 'Supporter_lastName'
        },
        {
          'label': i18n.t("label.sorting.fields.email"),
          'value': 'Profile_email'
        },
        {
          'label': i18n.t("label.sorting.fields.since"),
          'value': 'User_created'
        },
        {
          'label': i18n.t("label.sorting.fields.mobile"),
          'value': 'Supporter_mobilePhone'
        },
        {
          'label': i18n.t("label.sorting.fields.age"),
          'value': 'Supporter_birthday'
        },
        {
          'label': i18n.t("label.sorting.fields.gender"),
          'value': 'Supporter_sex'
        }
      ]
    }
  }

  setFields (i18n) {
    this.fields = Sorting.generateFields(i18n)
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
