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
          "keyword": ""
        }
      },
      methods: {
        input: function (event) {
          this.keyword = event.target.value
          var query = FilterQuery.apply(this.keyword)
          var res = { 'state': 'error' }
          if(typeof query !== "undefined") {
            res = query.getQuery()
            res['state'] = 'success'
          }
          this.$emit('newQuery', res)
        }
      }
    }
</script>

<style scoped>

</style>
