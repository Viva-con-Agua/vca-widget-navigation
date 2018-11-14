<template>
  <div v-if="error() && errorCode === 404" class="user-infos" :class="type">
    <span class="error">{{ $vcaI18n.t('error.notFound') }}</span>
  </div>
  <div v-else-if="error() && errorCode === 401" class="user-infos" :class="type">
    <span class="error">{{ $vcaI18n.t('error.notAuthenticated') }}</span>
  </div>
  <div v-else-if="error() && errorCode === 403" class="user-infos" :class="type">
    <span class="error">{{ $vcaI18n.t('error.forbidden') }}</span>
  </div>
  <div v-else-if="defined()" class="user-infos" :class="type">
    <h2 class="name">
      <span class="firstName">{{ user.profiles[0].supporter.firstName }}</span>
      <span class="lastName">{{ user.profiles[0].supporter.lastName }}</span>
    </h2>
    <div class="details">
      <div class="personal details-column">
        <span v-if="type !== 'small'" class="age">{{ $vcaI18n.t('label.age') + $vcaI18n.t('label.separator') + getAge() }}</span>
        <div v-if="type !== 'small'" class="contact">
          <!--<span v-if="user.profiles[0].hasOwnProperty('email')" class="typcn typcn-mail"></span>-->
          <!--<span v-if="user.profiles[0].supporter.hasOwnProperty('mobilePhone') && user.profiles[0].supporter.mobilePhone !== null" class="typcn typcn-phone"></span>-->
          <div v-if="user.profiles[0].hasOwnProperty('email')" v-html="require('./images/mail.svg')" v-tooltip="user.profiles[0].email"/>
          <div v-if="user.profiles[0].supporter.hasOwnProperty('mobilePhone') && user.profiles[0].supporter.mobilePhone !== null" v-html="require('./images/phone.svg')" v-tooltip="user.profiles[0].supporter.mobilePhone" />
        </div>
      </div>
      <div class="vca details-column">
        <span v-if="type !== 'small'" class="since">{{ $vcaI18n.t('label.since') + $vcaI18n.t('label.separator') + getSince() }}</span>
        <span v-if="type !== 'small' && showCrew()" class="crew">{{ user.profiles[0].supporter.crew.name }}</span>
        <span v-else-if="type !== 'small'" class="crew">{{ $vcaI18n.t('fallback.noCrew') }}</span>
      </div>
    </div>
  </div>
  <div v-else class="user-infos" :class="type">
    <span class="error">{{ $vcaI18n.t("error.unknown") }}</span>
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

  @padding: 0.3em;

  #fontSizes() {
    small: 0.7em;
    medium: 0.8em;
    large: 1em;
    details: 0.7em;
  }

  h2.name {
    margin: 0;
  }

  span.error {
    color: grey;
  }

  .small {
    font-style: italic;

    h2.name {
      font-size: #fontSizes[small];
      text-align: center;
    }

    span.error {
      font-size: #fontSizes[small];
    }
  }

  .medium {
    h2.name {
      font-size: #fontSizes[medium];
      font-weight: bold;

      .lastName {
        font-size: #fontSizes[medium] * 0.8;
      }
    }

    span.error {
      font-size: #fontSizes[medium];
    }
  }

  .large {
    h2.name {
      font-size: #fontSizes[large];
      font-weight: bolder;

      .lastName {
        font-size: #fontSizes[large] * 0.7;
      }
    }

    span.error {
      font-size: #fontSizes[large];
    }
  }

  .details {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .details-column {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      span {
        font-style: italic;
        font-size: #fontSizes[details];
      }
    }

    .personal {
      text-align: left;

      .contact {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        height: #fontSizes[details];

        div {
          height: #fontSizes[details];
          width: #fontSizes[details];
          &:not(:first-child) {
            margin-left: #fontSizes[details] * 0.5;
          }
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

  .user-infos {
    display: flex;
    flex-direction: column;
    justify-content: center;

    &.large {
      margin-top: @padding;
      height: (3* @padding) + #fontSizes[large] + (#fontSizes[details] * 2);
      padding-bottom: @padding;
    }

    &.large .details, &.medium .details {
      padding: @padding;
    }
  }
</style>
