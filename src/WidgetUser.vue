<template>
  <div v-if="defined()">
    <img v-if="showImg && user.profiles[0].avatar.length != 0" :src="user.profiles[0].avatar[0]" alt="Missing image" />
    <span :class="typeData">{{ user.profiles[0].supporter.fullName }}</span>
  </div>
  <div v-else>
    <span :class="typeData">There is currently no user logged in!</span>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'

  // Vue.use(axios);

  export default {
    name: 'UserWidget',
    props: ['uuid', 'type'],
    data () {
      return {
        showImg: (this.type === 'medium' || this.type === 'large'),
        user: null,
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
      axios.get('/drops/widgets/user/' + this.uuidData)
        .then(response => {
          switch (response.status) {
            case 200:
              this.user = response.data.additional_information
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
    },
    methods: {
      empty: function () {
        return this.user == null
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
