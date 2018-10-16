import FilterFieldList from './FilterFieldList';
import FilterFieldKeyword from './FilterFieldKeyword';
import merge from 'deepmerge';

export default class FilterQuery {

  constructor (fieldLists) {
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

  getFields () {
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
    return new FilterQuery(
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

    if(FilterFieldKeyword.isPhoneNumber(keyword)) {
      queries.push(FilterQuery.construct(FilterFieldKeyword.getPhoneFields(), FilterFieldKeyword.getPhone(keyword)))
    }

    if(FilterFieldKeyword.isDate(keyword)) {
      queries.push(FilterQuery.construct(FilterFieldKeyword.getDateFields(), FilterFieldKeyword.getDate(keyword)))
      if(FilterFieldKeyword.isDate(keyword, true)) {
        defaultSearch = false
      }
    }

    if(FilterFieldKeyword.isGender(keyword)) {
      queries.push(FilterQuery.construct(FilterFieldKeyword.getGenderFields(), FilterFieldKeyword.getGender(keyword)))
    }

    if(defaultSearch) {
      queries.push(FilterQuery.construct(FilterFieldKeyword.getDefaultFields(), FilterFieldKeyword.getString(keyword)))
    }
    return queries
  }

  static construct (fieldSet, maskedKeywords) {
    var res = null
    var fieldLists = []
    if (Array.isArray(maskedKeywords) && Array.isArray(fieldSet)) {
      fieldLists.push(new FilterFieldList(fieldSet, maskedKeywords, "_OR_"))
      res = new FilterQuery(fieldLists)
    }
    return res
  }
}
