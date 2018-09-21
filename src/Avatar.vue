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
          return this.errorCode !== null
        },
        show: function () {
          return this.type !== 'small'
        }
      }
    }
</script>

<style scoped>

  .wrapper {
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .wrapper.small {
    background-image: url('./images/avatar_bg_stripes_32x32.png');
    width: 3em;
    height: 3em;
  }

  .wrapper.medium {
    background-image: url('./images/avatar_bg_stripes_32x32.png');
    width: 4em;
    height: 4em;
  }

  .wrapper.large {
    background-image: url('./images/avatar_bg_200x162.png');
    width: 10em;
    height: 10em;
  }

  .wrapper.error {
    filter: grayscale(100%);
  }

  .wrapper >>> svg #freak,
  .wrapper >>> svg #questionMark,
  .wrapper >>> svg #exclamationMark {
    fill: #fff;
  }

  .small >>> svg {
    height: 2em;
  }

  .large >>> svg {
    height: 9em;
  }

  .medium.error >>> svg {
    margin-top: 0.5em;
    height: 3em;
  }

  .large.error >>> svg {
    margin-top: 2em;
    height: 6em;
  }

</style>
