<template>
    <table class="users-table">
      <thead>
        <TableRow type="header" />
      </thead>
      <tbody>
        <TableRow v-for="(user, i) of users" type="row" :className="(i % 2 == 0) ? 'even' : 'odd'" :user="user" :key="user.id" />
      </tbody>
    </table>
</template>

<script>
    import TableRow from './TableRow'
    export default {
      name: 'TableUsers',
      components: { TableRow },
      props: ['users']
    }
</script>

<style scoped>
  .users-table {
    border: 0.3em;
    border-color: rgba(10, 107, 145, 1);
    border-spacing: 0.5rem;
    border-collapse: collapse;
    overflow-y: auto;
  }

  .users-table .odd {
    background-color: rgba(10, 107, 145, 0.2);
  }
</style>
