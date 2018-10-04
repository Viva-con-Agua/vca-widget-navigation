<template>
  <div v-if="error() && errorCode === 404" class="user-infos" :class="type">
    <span class="error">Not Found</span>
  </div>
  <div v-else-if="error() && errorCode === 401" class="user-infos" :class="type">
    <span class="error">Not Authenticated</span>
  </div>
  <div v-else-if="error() && errorCode === 403" class="user-infos" :class="type">
    <span class="error">Forbidden</span>
  </div>
  <div v-else-if="defined()" class="user-infos" :class="type">
    <h2 class="name">{{ user.profiles[0].supporter.fullName }}</h2>
    <div class="details">
      <div class="personal details-column">
        <span v-if="type !== 'small'" class="age">Alter: {{ getAge() }}</span>
        <div v-if="type !== 'small'" class="contact">
          <!--<span v-if="user.profiles[0].hasOwnProperty('email')" class="typcn typcn-mail"></span>-->
          <!--<span v-if="user.profiles[0].supporter.hasOwnProperty('mobilePhone') && user.profiles[0].supporter.mobilePhone !== null" class="typcn typcn-phone"></span>-->
          <div v-if="user.profiles[0].hasOwnProperty('email')" v-html="require('./images/mail.svg')" v-tooltip="user.profiles[0].email"/>
          <div v-if="user.profiles[0].supporter.hasOwnProperty('mobilePhone') && user.profiles[0].supporter.mobilePhone !== null" v-html="require('./images/phone.svg')" v-tooltip="user.profiles[0].supporter.mobilePhone" />
        </div>
      </div>
      <div class="vca details-column">
        <span v-if="type !== 'small'" class="since">Dabei seit: {{ getSince() }}</span>
        <span v-if="type !== 'small' && showCrew()" class="crew">{{ user.profiles[0].supporter.crew }}</span>
        <span v-else-if="type !== 'small'" class="crew">Keine Crew</span>
      </div>
    </div>
  </div>
  <div v-else class="user-infos" :class="type">
    <span class="error">An unknown error occurred</span>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VTooltip from 'v-tooltip'

  Vue.use(VTooltip)

  export default {
    name: 'InfoField',
    props: ['type', 'user', 'errorCode'],
    methods: {
      empty: function () {
        return this.user == null || typeof this.user === 'undefined'
      },
      defined: function () {
        return !this.empty()
      },
      showCrew: function () {
        return this.defined() && this.user != null && typeof this.user !== 'undefined' &&
              this.user.profiles[0].supporter.hasOwnProperty('crew')
      },
      error: function () {
        return this.errorCode !== null
      },
      getAge: function () {
        var birthday = new Date(this.user.profiles[0].supporter.birthday)
        var ageDifMs = Date.now() - birthday.getTime()
        var ageDate = new Date(ageDifMs) // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970)
      },
      getSince: function () {
        var created = new Date(this.user.created)
        return created.getUTCFullYear()
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./assets/general.less";

  h2.name {
    margin: 0;
  }

  span.error {
    color: grey;
  }

  .small {
    font-style: italic;

    h2.name {
      font-size: 0.7em;
    }

    span.error {
      font-size: 0.7em;
    }
  }

  .medium {
    h2.name {
      font-size: 0.8em;
      font-weight: bold;
    }

    span.error {
      font-size: 0.8em;
    }
  }

  .large {
    h2.name {
      font-size: 1em;
      font-weight: bolder;
    }

    span.error {
      font-size: 1em;
    }
  }

  .details {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.3em;

    div {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      span {
        font-style: italic;
        font-size: 0.7em;
      }
    }

    .personal {
      text-align: left;

      .contact {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        height: 0.7em;

        div {
          height: 0.7em;
        }

        div /deep/ svg #icon {
          fill: #colors[primary];
        }
      }
    }

    .vca {
      text-align: right;
    }
  }

  div.user-infos {
    display: flex;
    flex-direction: column;
    justify-content: center;

    &.large {
      margin-top: 0.3em;
      height: 4em;
    }
  }
</style>
