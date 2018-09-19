<template>

  <div v-if="exists" :class="type" class="wrapper">
    <div v-html="require('./images/default.svg')"/>
  </div>
  <div v-else class="wrapper">
    <img :src="user.profiles[0].avatar[0]" :class="type" :alt="user.profiles[0].supporter.fullName" />
  </div>
</template>

<script>
    export default {
      name: 'Avatar',
      props: ['user', 'type'],
      methods: {
        exists: function () {
          var avatar = this.user.profiles[0].avatar
          return (avatar !== null && avatar.length !== 0)
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

  .wrapper >>> svg #freak {
    fill: #fff;
  }

  .small svg {
    height: 2em;
  }

  .medium svg {
    height: 3em;
  }

  .large svg {
    height: 9em;
  }

</style>
