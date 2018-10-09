export default class FilterQuery {

  constructor (keyword, fieldSet, maskedKeywords) {
    this.keyword = keyword
    this.maskedKeywords = maskedKeywords
    this.fieldSet = fieldSet
    this.query = FilterQuery.getResult(this.fieldSet, this.maskedKeywords)
  }

  getQuery () {
    return this.query
  }

  static apply(keyword) {

    var queries = []
    var defaultSearch = true

    if(FilterQuery.isPhoneNumber(keyword)) {
      console.log("is phone")
      var currentFieldSet = FilterQuery.Fields.filter(field => field.type === "String" && field.name === "Supporter_mobilePhone")
      var maskedKeywords = FilterQuery.getPhone(keyword)
      queries.push(new FilterQuery(keyword, currentFieldSet, maskedKeywords))

    }

    if(FilterQuery.isDate(keyword)) {
      console.log("is date")
      // Todo!

    }

    if(FilterQuery.isGender(keyword)) {
      console.log("is gender")
      var currentFieldSet = FilterQuery.Fields.filter(field => field.type === "String" && field.name === "Supporter_sex")
      var maskedKeywords = [FilterQuery.getGender(keyword)]
      queries.push(new FilterQuery(keyword, currentFieldSet, maskedKeywords))
      defaultSearch = false
    }

    if(defaultSearch) {
      var currentFieldSet = FilterQuery.Fields.filter(field => field.type === "String" && field.name !== "Supporter_mobilePhone" && field.name !== "Supporter_sex")
      var maskedKeywords = ["%" + keyword + "%"]
      queries.push(new FilterQuery(keyword, currentFieldSet, maskedKeywords))

    }
    
    return queries[0]
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

  static generateQuery (currentFieldSet, numberOfKeywordAlternatives) {
    var queries = []
    for (var i = 0; i < numberOfKeywordAlternatives; i++) {
      queries.push(currentFieldSet.map(field => field.path + "." + i + "." + field.op).join("_OR_"))
    }
    return { "query": queries.join("_OR_")}
  }

  static generateValues (currentFieldSet, maskedKeywords) {
    var res = {}
    res["values"] = {}
    for(var k in maskedKeywords) {
      for (var i in currentFieldSet) {
        var path = currentFieldSet[i].path.split(".")
        var prefix = path.slice(0, path.length - 1)
        var last = path[path.length - 1]
        var tree = res["values"]
        for (var j in prefix) {
          if (!tree.hasOwnProperty(prefix[j])) {
            tree[prefix[j]] = {}
          }
          tree = tree[prefix[j]]
        }
        if(!tree.hasOwnProperty(last)) {
          tree[last] = {}
        }
        tree[last]["" + k] = maskedKeywords[k]
      }
    }
    return res
  }

  static getResult (currentFieldSet, maskedKeywords) {
    var res = {}
    var q = FilterQuery.generateQuery(currentFieldSet, maskedKeywords.length)
    var v = FilterQuery.generateValues(currentFieldSet, maskedKeywords)
    Object.keys(q).forEach(key => res[key] = q[key])
    Object.keys(v).forEach(key => res[key] = v[key])
    return res
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
