<template>

  <div class="user-widget-list">
    <button v-if="page.hasPrevious()" v-on:click="removePage" class="paginate">Show previous ({{ page.howManyPrevious() }})</button>
    <div class="users-list">
      <WidgetUser v-for="user of users" v-bind:user="user" type="large" :key="user.id"></WidgetUser>
    </div>
    <button v-if="page.hasNext()" v-on:click="addPage" class="paginate">Show next ({{ page.howManyNext() }})</button>
  </div>

</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import WidgetUser from './WidgetUser'
  import Page from './utils/Page'

  Vue.use(WidgetUser)

  export default {
    name: 'WidgetUserList',
    props: ['pageSize'],
    components: {
      'WidgetUser': WidgetUser
    },
    data () {
      return {
        users: [],
        page: Page.apply(0),
        errorState: null
      }
    },
    created () {
      axios.post('/drops/widgets/users/count', {})
            .then(response => {
              switch (response.status) {
                case 200:
                  this.page = Page.apply(response.data.additional_information.count)
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
        axios.post('/drops/widgets/users', { 'limit': this.page.getSize(), 'offset': this.page.getOffset() })
              .then(response => {
                switch (response.status) {
                  case 200:
                    this.users = response.data.additional_information
                    break
                }
              }).catch(error => {
                this.errorState = error.response.status
              })
      }
    }
  }
</script>

<style scoped>
  .user-widget-list {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .paginate {
    background-color: white;
    border: 1pt solid #0a8eb6;
    color: #0a6b91;
    border-radius: 1em;
    height: 2.5em;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .paginate:hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  }

  .users-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
    align-content: flex-start;
  }

  .users-list >>> .user.card {
    margin: 0.5em;
  }
</style>
