<template>
    <div v-if="defined()">
      <Avatar v-bind:user="userData" v-bind:type="typeData"></Avatar>
      <span :class="typeData">{{ userData.profiles[0].supporter.fullName }}</span>
    </div>
    <div v-else>
      <span :class="typeData">There is currently no user logged in!</span>
    </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import Avatar from './Avatar'

  Vue.use(Avatar)
  // Vue.use(axios);

  export default {
    name: 'UserWidget',
    props: ['uuid', 'type', 'user'],
    components: {
      'Avatar': Avatar
    },
    data () {
      return {
        showImg: (this.type === 'medium' || this.type === 'large'),
        userData: this.user,
        uuidData: this.uuid,
        typeData: this.type
      }
    },
    created () {
      if (this.uuidData == null) {
        this.uuidData = Vue.$widgetUserDefaultUUID
      }
      if (this.typeData == null) {
        this.typeData = Vue.$widgetUserDefaultType
      }
      if (this.userData == null) {
        axios.get('/drops/widgets/user/' + this.uuidData)
          .then(response => {
            switch (response.status) {
              case 200:
                this.userData = response.data.additional_information
                break
            }
          }).catch(error => {
            switch (error.response.status) {
              case 404:
              // Todo: How to handle error messages?
              // that.open(that.$t('signin.error'), error.response.data.msg, "error");
                break
            }
          })
      }
    },
    methods: {
      empty: function () {
        return this.userData == null
      },
      defined: function () {
        return !this.empty()
      }
    }
  }
</script>

<style scoped>

  span.small {
    font-size: 0.5em;
    font-style: italic;
  }

  span.medium {
    font-size: 0.9em;
    font-weight: bold;
  }

  span.large {
    font-size: 1.2em;
    font-weight: bolder;
  }
</style>
