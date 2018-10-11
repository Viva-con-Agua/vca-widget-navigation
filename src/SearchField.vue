<template>
  <div class="searchWrapper">
    <div class="search">
      <input v-bind:value="keyword" :placeholder="$vcaI18n.t('label.placeholder.search')" v-on:input="input" v-on:keyup.enter="clean" />
      <button @click="clean" :title="$vcaI18n.t('label.search.button.and')">
        <div v-html="require('./images/plus.svg')" />
      </button>
    </div>
    <div class="tags">
      <SearchTagQuery v-for="(q,k) in currentQueries" :query="q" :index="k" :key="k" v-on:changeQuery="updateQuery" />
    </div>
  </div>
</template>

<script>
  import FilterQuery from './utils/FilterQuery'
  import SearchTagQuery from './SearchTagQuery'

    export default {
      name: "SearchField",
      components: {
        'SearchTagQuery': SearchTagQuery
      },
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
          this.currentQueries = FilterQuery.apply(this.keyword)
          this.issueRequest()
        },
        updateQuery(event) {
          this.currentQueries[event.index] = event.query
          if(event.query.isEmpty()) {
            this.currentQueries.splice(event.index, 1)
            this.clean()
          }
          this.issueRequest()
        },
        issueRequest() {
          var queries = this.currentQueries.slice(0)
          if(queries.length > 0) {
            var query = queries.pop()
            query = queries.reduce((acc, current) => acc.merge(current), query)

            var res = {'state': 'error'}
            if (typeof query !== "undefined") {
              res = query.getQuery()
              res['state'] = query.status
            }
            this.$emit('newQuery', res)
          } else {
            this.$emit('newQuery', {
              'state': 'success',
              'query': "",
              'values': {}
            })
          }
        },
        clean() {
          this.keyword = ""
        }
      }
    }
</script>

<style scoped lang="less">
  @import './assets/general.less';

  .searchWrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
  }

  .tags {
    display: flex;
    flex-direction: row;
  }

  .search {
    display: flex;
    flex-direction: row;

    input {
      flex-grow: 1;
    }

    button {
      .svgButton()
    }
  }

</style>
