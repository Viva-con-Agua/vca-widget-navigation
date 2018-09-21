<template>
    <div :class="typeData" class="card">
      <Avatar v-bind:error-code="errorState" v-bind:user="userData" v-bind:type="typeData"></Avatar>
      <InfoField v-bind:error-code="errorState" v-bind:user="userData" v-bind:type="typeData"></InfoField>
    </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import Avatar from './Avatar'
  import InfoField from './InfoField'

  Vue.use(Avatar)
  Vue.use(InfoField)
  // Vue.use(axios);

  export default {
    name: 'UserWidget',
    props: ['uuid', 'type', 'user'],
    components: {
      'Avatar': Avatar,
      'InfoField': InfoField
    },
    data () {
      return {
        showImg: (this.type === 'medium' || this.type === 'large'),
        errorState: null,
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
            this.errorState = error.response.status
          })
      }
    }
  }
</script>

<style scoped>

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

  div.medium.user-infos {
    flex-grow: 1;
  }
</style>
