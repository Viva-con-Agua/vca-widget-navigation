<template>
    <div class="medium">
      <Avatar v-bind:user="user" type="medium"></Avatar>
      <span class="medium">{{ user.profiles[0].supporter.fullName }}</span>
    </div>
</template>

<script>
  import Vue from 'vue'
  import Avatar from './Avatar'

  Vue.use(Avatar)

  export default {
    name: 'MediumUser',
    props: ['user'],
    components: {
      'Avatar': Avatar
    }
  }
</script>

<style scoped>

  span.medium {
    font-size: 0.9em;
    font-weight: bold;
    padding: 1em;
  }

  div.medium {
    display: flex;
    flex-direction: row;
  }

</style>
