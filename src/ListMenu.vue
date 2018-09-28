<template>
  <div class="listMenu">
    <v-select v-model="typeData" @input="fire" :options="types" :clearable="false"></v-select>
  </div>
</template>

<script>
  // import Vue from 'vue'
  import vSelect from 'vue-select'

  export default {
    name: 'ListMenu',
    props: ['type'],
    components: {
      'v-select': vSelect
    },
    data () {
      var types = [
        {
          'label': 'Large',
          'value': 'large'
        },
        {
          'label': 'Middle',
          'value': 'medium'
        },
        {
          'label': 'Small',
          'value': 'small'
        }
      ]
      return {
        'typeData': types.filter((t) => t.value === this.type).pop(),
        'types': types
      }
    },
    methods: {
      fire: function () {
        this.$emit('input', this.typeData.value)
      }
    }
  }
</script>

<style scoped>

</style>
