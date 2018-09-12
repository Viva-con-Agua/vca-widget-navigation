<template>

  <div v-if="exists">
    <div :class="type" v-html="require('./images/default.svg')"/>
  </div>
  <div v-else>
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

.small {
  width: 32px;
  height: 32px;
}

.medium {
  width: 50px;
  height: 50px;
}

.large {
  width: 200px;
  height: 200px;
}

</style>
