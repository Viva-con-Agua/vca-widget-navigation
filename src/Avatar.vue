<template>

  <div v-if="error() && show() && errorCode === 404" :class="type" class="wrapper error">
    <div v-html="require('./images/question_mark.svg')"/>
  </div>
  <div v-else-if="error() && show()" :class="type" class="wrapper error">
    <div v-html="require('./images/exclamation_mark.svg')"/>
  </div>
  <div v-else-if="!exists() && show()" :class="type" class="wrapper">
    <div v-html="require('./images/default.svg')"/>
  </div>
  <div v-else-if="show()" class="wrapper">
    <img :src="user.profiles[0].avatar[0]" :class="type" :alt="user.profiles[0].supporter.fullName" />
  </div>
  <div v-else class="wrapper"></div>
</template>

<script>
    export default {
      name: 'Avatar',
      props: ['user', 'type', 'errorCode'],
      methods: {
        exists: function () {
          return this.user !== null && typeof user !== 'undefined' && this.user.hasOwnProperty('profiles') &&
            this.user.profiles[0].hasOwnProperty('avatar') && this.user.profiles[0].avatar !== null &&
            this.user.profiles[0].avatar.length !== 0
        },
        error: function () {
          return this.errorCode !== null && (typeof this.errorCode !== 'undefined')
        },
        show: function () {
          return this.type !== 'small'
        }
      }
    }
</script>

<style scoped lang="less">
  @import "./assets/general.less";
  @small-bg: "./images/avatar_bg_stripes_32x32.png";
  @medium-bg: "./images/avatar_bg_stripes_32x32.png";
  @large-bg: "./images/avatar_bg_200x162.png";

  .wrapper {
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .wrapper.small {
    background-image: url(@small-bg);
    width: 3em;
    height: 3em;
  }

  .wrapper.medium {
    background-image: url(@medium-bg);
    width: 4em;
    height: 4em;
  }

  .wrapper.large {
    background-image: url(@large-bg);
    width: 10em;
    height: 10em;
  }

  .wrapper.error {
    filter: grayscale(100%);
  }

  .wrapper /deep/ svg #freak,
  .wrapper /deep/ svg #questionMark,
  .wrapper /deep/ svg #exclamationMark {
    fill: #colors[secundary];
  }

  .small /deep/ svg {
    height: 2em;
  }

  .large /deep/ svg {
    height: 9em;
  }

  .medium.error /deep/ svg {
    margin-top: 0.5em;
    height: 3em;
  }

  .large.error /deep/ svg {
    margin-top: 2em;
    height: 6em;
  }

</style>
