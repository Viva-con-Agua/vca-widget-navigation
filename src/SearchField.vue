<template>
  <div class="searchWrapper">
    <div class="search">
      <input v-bind:value="keyword" :placeholder="$vcaI18n.t('label.placeholder.search')"
             v-on:input="input" v-on:keyup.enter="clean" v-on:keyup.space="clean" />
      <button @click="clean" :title="$vcaI18n.t('label.search.button.and')">
        <div v-html="require('./images/plus.svg')" />
      </button>
    </div>
    <div class="tags">
      <template v-for="(q,k) in currentQueries">
        <SearchTagQuery :query="q" :index="k" :key="k" v-on:changeQuery="updateQuery" />
        <div v-if="k !== (currentQueries.length - 1)" class="divider" v-html="require('./images/plus.svg')" />
      </template>
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
          "currentQueries": [],
          "pointer": 0
        }
      },
      methods: {
        input: function (event) {
          this.keyword = event.target.value.trim()
          if(this.keyword !== "") {
            this.currentQueries.splice(this.pointer, 1, FilterQuery.apply(this.keyword))
          } else {
            this.currentQueries.splice(this.pointer, 1)
            this.clean()
          }
          this.issueRequest()
        },
        updateQuery(event) {
          this.currentQueries.splice(event.index, 1, event.query)
          if(event.query.isEmpty()) {
            this.currentQueries.splice(event.index, 1)
            if(event.index === this.pointer) {
              this.clean()
            }
          }
          this.issueRequest()
        },
        issueRequest() {
          var queries = this.currentQueries.slice(0)
          if(queries.length > 0) {
            var query = queries.pop()
            query = queries.reduce((acc, current) => acc.and(current), query)

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
          this.pointer = this.currentQueries.length
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

  .divider {
    margin: 0.2em;
    padding: 0.5em 0.8em;

    & /deep/ svg {
      width: 1.5em;
      fill: #colors[primaryDeactivated];
    }
  }

</style>
