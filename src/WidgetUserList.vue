<template>

  <div class="user-widget-list">
    <button v-if="limit.offset != 0" v-on:click="removePage" class="paginate">Show previous</button>
    <div class="users-list">
      <WidgetUser v-for="user of users" v-bind:user="user" type="large" :key="user.id"></WidgetUser>
    </div>
    <button va-if="limit.pageEnd != count" v-on:click="addPage" class="paginate">Show next</button>
  </div>

</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import WidgetUser from './WidgetUser'

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
        count: null,
        limit: {
          pageSize: this.pageSize,
          offset: 0
        },
        errorState: null
      }
    },
    created () {
      if (this.limit.pageSize == null || typeof this.limit.pageSize === 'undefined') {
        this.limit.pageSize = 20
      }
      this.init()
      axios.post('/drops/widgets/users/count', {})
            .then(response => {
              switch (response.status) {
                case 200:
                  this.count = response.data.additional_information.count
              }
            }).catch(error => {
              this.errorState = error.response.status
            })
    },
    methods: {
      addPage: function (event) {
        if (this.limit.offset + this.limit.pageSize <= this.count) {
          this.limit.offset = this.limit.offset + this.limit.pageSize
        }
        this.init()
      },
      removePage: function (event) {
        this.limit.offset = this.limit.offset - this.limit.pageSize
        if (this.limit.offset < 0) {
          this.limit.offset = 0
        }
        this.init()
      },
      init: function () {
        axios.post('/drops/widgets/users', { 'limit': this.limit.pageSize, 'offset': this.limit.offset })
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
