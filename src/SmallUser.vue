<template>
  <span class="small">{{ fullName }}</span>
</template>

<script>
    export default {
      name: 'SmallUser',
      props: ['fullName']
    }
</script>

<style scoped>
  .small {
    font-size: 0.5em;
    font-style: italic;
  }
</style>
