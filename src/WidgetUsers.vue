<template>
  <div class="users-list">
    <WidgetUser v-for="user of users" v-bind:user="user" v-bind:type="type" :key="user.id"></WidgetUser>
  </div>
</template>

<script>
  import WidgetUser from './WidgetUser'

  export default {
    name: 'WidgetUsers',
    components: {
      'WidgetUser': WidgetUser
    },
    props: ['users', 'type']
  }
</script>

<style scoped>
  .users-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    align-content: flex-start;
  }

  .users-list >>> .user-role-wrapper {
    margin: 0.5em;
  }
</style>
