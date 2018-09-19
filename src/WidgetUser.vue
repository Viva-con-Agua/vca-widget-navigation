<template>
    <div v-if="defined()" :class="typeData" class="card">
      <Avatar v-if="typeData !== 'small'" v-bind:user="userData" v-bind:type="typeData"></Avatar>
      <div class="user-infos">
        <span :class="typeData" class="name">{{ userData.profiles[0].supporter.fullName }}</span>
        <span v-if="typeData !== 'small' && showCrew()" :class="typeData" class="crew">({{ userData.profiles[0].supporter.crew }})</span>
        <span v-else :class="typeData" class="crew">(No crew)</span>
      </div>
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
                // console.log(response.data)
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
      },
      showCrew: function () {
        return this.defined() && this.userData.profiles[0].supporter.hasOwnProperty('crew')
      }
    }
  }
</script>

<style scoped>

  span.small.name {
    font-size: 0.8em;
    font-style: italic;
  }

  span.medium.name {
    font-size: 0.9em;
    font-weight: bold;
  }

  span.large.name {
    font-size: 1.2em;
    font-weight: bolder;
  }

  span.crew {
    font-style: italic;
    font-size: 0.7em;
  }

  span.large.crew {
    margin: 0 0 0.5em;
  }

  div.small.card {
    display: flex;
    background-color: rgba(165, 119, 64, 0.6);
    color: #fff;
    margin: 0.5em;
    width: 5em;
    border-radius: 0.5em;
    padding: 0.2em 0.5em;
    justify-content: center;
  }

  div.small.card:hover {
    background-color: rgba(165, 119, 64, 1);
  }

  div.medium.card,
  div.large.card {
    display: flex;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    text-align: center;
  }

  div.large.card {
    flex-direction: column;
    width: 10em;
  }

  div.medium.card {
    width: 12em;
    flex-direction: row;
  }

  div.user-infos {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  div.medium .user-infos {
    flex-grow: 1;
  }
</style>
