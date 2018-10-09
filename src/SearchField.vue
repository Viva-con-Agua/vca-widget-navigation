<template>

  <input v-bind:value="keyword" :placeholder="$vcaI18n.t('label.placeholder.search')" v-on:input="input" />

</template>

<script>
  import FilterQuery from './utils/FilterQuery'

    export default {
      name: "SearchField",
      props: ['query'], // Todo: Do something with that given query!
      data () {
        return {
          "keyword": "",
          "currentQueries": []
        }
      },
      methods: {
        input: function (event) {
          this.keyword = event.target.value
          var queries = FilterQuery.apply(this.keyword)
          this.currentQueries = queries.slice(0)

          var query = queries.pop()
          query = queries.reduce((acc, current) => acc.merge(current), query)

          var res = { 'state': 'error' }
          if(typeof query !== "undefined") {
            res = query.getQuery()
            res['state'] = query.status
          }
          this.$emit('newQuery', res)
        }
      }
    }
</script>

<style scoped>

</style>
