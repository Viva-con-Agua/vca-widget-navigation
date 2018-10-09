export default class FilterQuery {

  constructor (keyword) {
    var res = { "state": "error" }
    var currentFieldSet = FilterQuery.Fields

    if(FilterQuery.isPhoneNumber(keyword)) {
      console.log("is phone")
      currentFieldSet = FilterQuery.Fields.filter(field => field.type === "String" && field.name === "Supporter_mobilePhone")
      var maskedKeywords = FilterQuery.getPhone(this.keyword)

    } else if(FilterQuery.isDate(keyword)) {
      console.log("is date")
      // Todo!

    } else if(FilterQuery.isGender(keyword)) {
      console.log("is gender")
      currentFieldSet = FilterQuery.Fields.filter(field => field.type === "String" && field.name === "Supporter_sex")
      var maskedKeyword = FilterQuery.getGender(keyword)
      res = FilterQuery.getResult(currentFieldSet, maskedKeyword)
      res['state'] = 'success'

    } else {
      currentFieldSet = FilterQuery.Fields.filter(field => field.type === "String" && field.name !== "Supporter_mobilePhone" && field.name !== "Supporter_sex")
      var maskedKeyword = "%" + keyword + "%"
      res = FilterQuery.getResult(currentFieldSet, maskedKeyword)
      res['state'] = 'success'
    }
    this.keyword = keyword
    this.fieldSet = currentFieldSet
    this.query = res
  }

  getQuery () {
    return this.query
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
    var separated = keyword.split(/\s|-/).map(p => "%" + p + "%")
    return ([
      "%" + keyword + "%"
    ]).concat(separated)
  }

  static generateQuery (currentFieldSet) {
    return { "query":  currentFieldSet.map(field => field.path + "." + field.op).join("_OR_") }
  }

  static generateValues (currentFieldSet, maskedKeyword) {
    var res = {}
    res["values"] = {}
    for(var i in currentFieldSet) {
      var path = currentFieldSet[i].path.split(".")
      var prefix = path.slice(0, path.length-1)
      var last = path[path.length - 1]
      var tree = res["values"]
      for(var j in prefix) {
        if(!tree.hasOwnProperty(prefix[j])) {
          tree[prefix[j]] = {}
        }
        tree = tree[prefix[j]]
      }
      tree[last] = maskedKeyword
    }
    return res
  }

  static getResult (currentFieldSet, maskedKeyword) {
    var res = {}
    var q = FilterQuery.generateQuery(currentFieldSet)
    var v = FilterQuery.generateValues(currentFieldSet, maskedKeyword)
    Object.keys(q).forEach(key => res[key] = q[key])
    Object.keys(v).forEach(key => res[key] = v[key])
    return res
  }
}

FilterQuery.Match = {
  'phone': {
    'name': 'phone',
    'pattern': /^\(?(((\(?\+\d{2}\)?)(\s|-)?)|0)\d{2,5}\)?(\s|-)?([0-9]|-|\s)+$/
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
