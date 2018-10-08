<template>

  <input v-bind:value="keyword" :placeholder="$vcaI18n.t('label.placeholder.search')" v-on:input="input" />

</template>

<script>
    export default {
      name: "SearchField",
      props: ['query'], // Todo: Do something with that given query!
      data () {
        return {
          "keyword": "",
          "fields": [{
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
        }
      },
      methods: {
        getFilterQuery: function() {
          function getQuery (currentFieldSet) {
            return { "query":  currentFieldSet.map(field => field.path + "." + field.op).join("_OR_") }
          }

          function getValues (currentFieldSet, maskedKeyword) {
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

          function getResult (res, currentFieldSet, maskedKeyword) {
            var q = getQuery(currentFieldSet)
            var v = getValues(currentFieldSet, maskedKeyword)
            res.state = "success"
            Object.keys(q).forEach(key => res[key] = q[key])
            Object.keys(v).forEach(key => res[key] = v[key])
            return res
          }

          function isPhoneNumber(keyword) {
            // Todo!
            return false
          }

          function isDate(keyword) {
            // Todo!
            return false
          }

          var res = { "state": "error" }
          if(isPhoneNumber(this.keyword)) {
            // Todo!
          } else if(isDate(this.keyword)) {
            // Todo!
          } else {
            var currentFieldSet = this.fields.filter(field => field.type === "String" && field.name !== "Supporter_mobilePhone")
            var maskedKeyword = "%" + this.keyword + "%"
            res = getResult(res, currentFieldSet, maskedKeyword)
          }
          return res
        },
        input: function (event) {
          this.keyword = event.target.value
          this.$emit('newQuery', this.getFilterQuery())
        }
      }
    }
</script>

<style scoped>

</style>
