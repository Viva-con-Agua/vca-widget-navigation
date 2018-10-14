import FilterFieldList from './FilterFieldList';
import merge from 'deepmerge';

export default class FilterQuery {

  constructor (keywords, fieldLists) {
    this.keywords = keywords
    this.status = "error"
    this.fieldLists = fieldLists
    this.query = this.getResult()
    this.status = "success"
  }

  isEmpty() {
    return this.fieldLists.length === 0
  }

  getQuery () {
    return this.query
  }

  getKeywords () {
    return this.keywords
  }

  getFieldSet () {
    return this.fieldLists.map(l => l.getFields()).flat(1)
  }

  removeField (field) {
    this.fieldLists.forEach((list, i) => {
      list.removeField(field)
      if(list.isEmpty()) {
        this.fieldLists.splice(i, 1)
      }
    })
    this.query = this.getResult()
    this.status = "success"
  }

  merge (other) {
    function unique(value, index, self) {
      return self.indexOf(value) === index;
    }

    return new FilterQuery(
      this.keywords.concat(other.keywords).filter(unique),
      this.fieldLists.concat(other.fieldLists)
    )
  }

  getResult () {
    var res = {}
    var q = this.generateQuery()
    var v = this.generateValues()
    Object.keys(q).forEach(key => res[key] = q[key])
    Object.keys(v).forEach(key => res[key] = v[key])
    return res
  }

  generateValues () {
    var offsets = {}
    var res = {}
    res["values"] = this.fieldLists.reduce((values, list) => {
      var merged = merge(values, list.getValues(offsets))
      for(var fieldName in list.getOffsets()) {
        if(offsets.hasOwnProperty(fieldName)) {
          offsets[fieldName] += list.getOffsets()[fieldName]
        } else {
          offsets[fieldName] = list.getOffsets()[fieldName]
        }
      }
      return merged
    }, {})
    return res
  }

  generateQuery () {
    var offsets = {}
    var queries = this.fieldLists.map(list => {
      var res = list.getQuery(offsets)
      for(var fieldName in list.getOffsets()) {
        if(offsets.hasOwnProperty(fieldName)) {
          offsets[fieldName] += list.getOffsets()[fieldName]
        } else {
          offsets[fieldName] = list.getOffsets()[fieldName]
        }
      }
      return res
    })
    return { "query": queries.join("_OR_")}
  }

  static apply(keyword) {

    var queries = []
    var defaultSearch = true

    if(FilterQuery.isPhoneNumber(keyword)) {
      console.log("is phone")
      var currentFieldSet = FilterQuery.Fields.filter(field => field.type === "String" && field.name === "Supporter_mobilePhone")
      var maskedKeywords = FilterQuery.getPhone(keyword)
      queries.push(FilterQuery.construct([keyword], currentFieldSet, maskedKeywords))

    }

    if(FilterQuery.isDate(keyword)) {
      console.log("is date")
      // Todo!

    }

    if(FilterQuery.isGender(keyword)) {
      console.log("is gender")
      var currentFieldSet = FilterQuery.Fields.filter(field => field.type === "String" && field.name === "Supporter_sex")
      var maskedKeywords = [FilterQuery.getGender(keyword)]
      queries.push(FilterQuery.construct([keyword], currentFieldSet, maskedKeywords))
    }

    if(defaultSearch) {
      var currentFieldSet = FilterQuery.Fields.filter(field => field.type === "String" && field.name !== "Supporter_mobilePhone" && field.name !== "Supporter_sex")
      var maskedKeywords = ["%" + keyword + "%"]
      queries.push(FilterQuery.construct([keyword], currentFieldSet, maskedKeywords))

    }
    return queries
  }

  static construct (keywords, fieldSet, maskedKeywords) {
    var res = null
    var fieldLists = []
    if (Array.isArray(maskedKeywords) && Array.isArray(fieldSet)) {
      fieldLists.push(new FilterFieldList(fieldSet, maskedKeywords, "_OR_"))
      res = new FilterQuery(keywords, fieldLists)
    }
    return res
  }

  static isDate (keyword) {
    return keyword.match(FilterQuery.Match.date.pattern)
  }

  static isPhoneNumber (keyword) {
    return keyword.match(FilterQuery.Match.phone.pattern)
  }

  static isGender (keyword) {
    return keyword.match(FilterQuery.Match.male.pattern) || keyword.match(FilterQuery.Match.female.pattern)
  }

  static getGender (keyword) {
    var res = 'female'
    if(keyword.match(FilterQuery.Match.male.pattern)) {
      res = 'male'
    }
    return res
  }

  static getPhone (keyword) {
    var separated = keyword
      .split(/\s|-/)
      .filter(p =>
        (typeof p !== "undefined") &&
        !p.match(FilterQuery.Match.phone.removable.prefix) &&
        !p.match(FilterQuery.Match.phone.removable.countryCode)
      ).map(p => "%" + p + "%")
    return ([
      "%" + keyword + "%"
    ]).concat(separated)
  }
}

FilterQuery.Match = {
  'phone': {
    'name': 'phone',
    'pattern': /^([0-9]|-|\s)+$/,  // /^\(?(((\(?\+\d{2}\)?)(\s|-)?)|0)\d{2,5}\)?(\s|-)?([0-9]|-|\s)+$/,
    'removable': {
      'countryCode': /\(?\+\d{2}\)?(\s|-)? /,
      'prefix': /^\(?(((\(?\+\d{2}\)?)(\s|-)?)|0)\d{2,5}\)?/
    }
  },
  'date': {
    'name': 'date',
    'pattern': /^((\d{2}([./-]))?\d{2}\1)?\d{4}$/
  },
  'male': {
    'name': 'male',
    'pattern': /^(males?)|(männlich)|(mann)|(männer)|(men)|(man)$/i
  },
  'female': {
    'name': 'female',
    'pattern': /^(females?)|(weiblich)|(frau)|(frauen)|(woman)|(women)a$/i
  }
}


FilterQuery.Fields = [{
  "name": "Supporter_firstName",
  "path": "supporter.firstName",
  "op": "LIKE",
  "type": "String"
}, {
  "name": "Supporter_lastName",
  "path": "supporter.lastName",
  "op": "LIKE",
  "type": "String"
}, {
  "name": "Profile_email",
  "path": "profile.email",
  "op": "LIKE",
  "type": "String"
}, {
  "name": "User_created",
  "path": "user.created",
  "op": "=", // Todo: LESS EQAUL und GREATER EQUAL
  "type": "Number"
}, {
  "name": "Supporter_placeOfResidence",
  "path": "supporter.placeOfResidence",
  "op": "LIKE",
  "type": "String"
}, {
  "name": "Supporter_mobilePhone",
  "path": "supporter.mobilePhone",
  "op": "LIKE", // Todo: Consider +49 (country code)
  "type": "String"
}, {
  "name": "Supporter_birthday",
  "path": "supporter.birthday",
  "op": "=", // Todo: Use the Age (Year with Less equal and greater equal)
  "type": "Number"
}, {
  "name": "Supporter_sex",
  "path": "supporter.sex",
  "op": "=", // Todo: transform input in possible values!
  "type": "String"
}]
