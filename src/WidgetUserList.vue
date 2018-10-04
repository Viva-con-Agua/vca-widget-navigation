<template>

  <div v-if="hasError()" class="user-widget-list error">
    <span v-if="errorState === 401">Please, log in first.</span>
    <span v-else-if="errorState === 403">Forbidden.</span>
    <span v-else>An error occurred!</span>
  </div>
  <div v-else class="user-widget-list">
    <ListMenu v-bind:type="type"
              v-bind:sorting="sorting"
              v-on:typeSelect="setType"
              v-on:sortDirSelect="setSortingDir"
              v-on:sortFieldSelect="setSortingField"
    />
    <button v-if="page.hasPrevious()" v-on:click="removePage" class="paginate">Show previous ({{ page.howManyPrevious() }})</button>
    <WidgetUsers v-if="type !== 'tableRow'" :users="users" :type="type" />
    <TableUsers v-else :users="users" />
    <button v-if="page.hasNext()" v-on:click="addPage" class="paginate">Show next ({{ page.howManyNext() }})</button>
  </div>

</template>

<script>
  import axios from 'axios'
  import Page from './utils/Page'
  import Sorting from './utils/Sorting'
  import ListMenu from './ListMenu'
  import TableUsers from './TableUsers'
  import WidgetUsers from './WidgetUsers'

  export default {
    name: 'WidgetUserList',
    props: ['pageSize', 'pageSliding', 'elementType'],
    components: {
      'ListMenu': ListMenu,
      'TableUsers': TableUsers,
      'WidgetUsers': WidgetUsers
    },
    data () {
      var size = 40
      if (this.pageSize !== null && typeof this.pageSize !== 'undefined') {
        size = this.pageSize
      }

      var sliding = Math.floor(size / 2)
      if (this.pageSliding !== null && typeof this.pageSliding !== 'undefined') {
        sliding = this.pageSliding
      }

      var defaultType = 'large'
      if (this.elementType !== null && typeof this.elementType !== 'undefined') {
        defaultType = this.elementType
      }

      return {
        type: defaultType,
        users: [],
        pageParams: { 'size': size, 'sliding': sliding },
        page: Page.apply(0, sliding, size),
        sorting: new Sorting(defaultType),
        errorState: null
      }
    },
    created () {
      axios.post('/drops/widgets/users/count', {})
            .then(response => {
              switch (response.status) {
                case 200:
                  this.page = Page.apply(response.data.additional_information.count, this.pageParams.sliding, this.pageParams.size)
                  this.getPage()
                  break
              }
            }).catch(error => {
              this.errorState = error.response.status
            })
    },
    methods: {
      addPage: function (event) {
        if (this.page.hasNext()) {
          this.page = this.page.next()
          this.getPage()
        }
      },
      removePage: function (event) {
        if (this.page.hasPrevious()) {
          this.page = this.page.previous()
          this.getPage()
        }
      },
      getPage: function () {
        axios.post('/drops/widgets/users', { 'sort': this.sorting.toJSONRequest(), 'limit': this.page.getSize(), 'offset': this.page.getOffset() })
              .then(response => {
                switch (response.status) {
                  case 200:
                    this.users = response.data.additional_information
                    break
                }
              }).catch(error => {
                this.errorState = error.response.status
              })
      },
      setType: function (event) {
        this.type = event
        this.sorting.setType(this.type)
      },
      setSortingDir: function (event) {
        this.sorting.setDir(event)
        this.getPage()
      },
      setSortingField: function (event) {
        this.sorting.setField(event)
        this.getPage()
      },
      hasError () {
        return this.errorState !== null && (typeof this.errorState !== 'undefined')
      }
    }
  }
</script>

<style scoped lang="less">
  @import './assets/general.less';

  .user-widget-list {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    &.error {
      align-items: center;

      span {
        .colorProfileThirdly();
        width: 30em;
        border-radius: @radius;
        height: 2em;
        box-shadow: #shadow[primary];
        line-height: 2em;
      }
    }
  }

  .paginate {
    .colorProfileSecundary();
    border: 1pt solid #0a8eb6;
    border-radius: @radius;
    height: 2.5em;
    .button();
  }
</style>
