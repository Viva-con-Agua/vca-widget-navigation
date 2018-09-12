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
    background-color: #2196f3;
    margin: 0.5em;
  }

  .wrapper svg {
    color: #fff;
  }

  .small {
    width: 2em;
    height: 2em;
  }

  .medium {
    width: 3em;
    height: 3em;
  }

  .large {
    width: 9em;
    height: 9em;
  }

</style>
