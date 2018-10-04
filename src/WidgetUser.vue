<template>
  <div v-if="this.empty()" :class="type" class="card user">
    <Avatar v-bind:error-code="errorState" v-bind:user="userData" v-bind:type="type"></Avatar>
    <InfoField v-bind:error-code="errorState" v-bind:user="userData" v-bind:type="type"></InfoField>
  </div>
  <a v-else :class="type" class="card user" v-bind:href="getURL()">
    <Avatar v-bind:error-code="errorState" v-bind:user="userData" v-bind:type="type"></Avatar>
    <InfoField v-bind:error-code="errorState" v-bind:user="userData" v-bind:type="type"></InfoField>
  </a>
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
        errorState: null,
        userData: this.user,
        uuidData: this.uuid// ,
        // typeData: null
      }
    },
    created () {
      // Todo: Should be part of some external wrapper solution!
      // if (this.uuidData == null) {
      //   this.uuidData = Vue.$widgetUserDefaultUUID
      // }
      // if (this.typeData == null) {
      //   this.typeData = Vue.$widgetUserDefaultType
      // }
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
    },
    methods: {
      empty: function () {
        return this.userData == null || typeof this.userData === 'undefined'
      },
      getURL: function () {
        var result = ''
        if (!this.empty()) {
          result = '/arise/#/profile/' + this.userData.id
        }
        return result
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./assets/general.less";
  @import "./assets/responsive.less";

  #sizes() {
    small: 5em;
    medium: 14em;
    large: 10em;
  }

  #heights() {
    small: 2em;
  }

  .card {
    display: flex;

    &.small {
      .colorProfileThirdly();
      width: #sizes[small];
      height: #heights[small];
      border-radius: @radius;
      padding: 0.2em 0.5em;
      justify-content: center;

      &:hover {
        background-color: #colors[thirdlyHover];
      }
    }

    &.medium {
      text-align: center;
      .button();
      width: #sizes[medium];
      flex-direction: row;

      @media @phone-down {
        width: 100%;
      }

      .user-infos {
        flex-grow: 1;
      }
    }

    &.large {
      text-align: center;
      .button();
      flex-direction: column;
      width: #sizes[large];

      @media @phone-down {
        width: 45%;
      }
    }
  }
</style>
