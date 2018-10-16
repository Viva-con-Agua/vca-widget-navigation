export default class FilterFieldKeyword {

  constructor (field, keyword, index = 1) {
    this.field = field
    this.keyword = keyword
    this.index = index
  }

  getName() {
    return this.field.name
  }

  getKeyword() {
    return this.keyword['keyword']
  }

  getQuery(offset = 0) {
    var number = offset + this.index
    return this.field.path + "." + number + "." + this.field.op
  }

  getValue(offset = 0) {
    var path = this.field.path.split(".")
    var values = {}
    values[path[0]] = {}

    return path.reduce((res, attr, i, fields) => {
      var pointer = res[fields[0]]
      for(var j = 1; j < i; j++) {
        pointer = pointer[fields[j]]
      }
      if(!pointer.hasOwnProperty(attr) && i !== 0) {
        pointer[attr] = {}
      }
      if(fields.length - 1 === i) {
        var number = offset + this.index
        pointer[attr]["" + number] = this.keyword['masked']
      }
      return res
    }, values)
  }

  equals(other) {
    return (typeof other !== "undefined") && other !== null && (typeof other.getName() !== "undefined") &&
      (typeof other.getKeyword() !== "undefined") && (this.getName() === other.getName() && this.getKeyword() === other.getKeyword())
  }
}
