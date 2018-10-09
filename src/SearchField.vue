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
          var query = new FilterQuery(this.keyword)
          this.$emit('newQuery', query.getQuery())
        }
      }
    }
</script>

<style scoped>

</style>
