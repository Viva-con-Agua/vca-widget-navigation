<template>
  <div class="listMenu">
    <v-select v-model="typeData" @input="fireTypeSelection" :options="types" :clearable="false"></v-select>
    <div class="sorting">
      <v-select v-model="sortData" @input="fireFieldSelection" :options="sortingFields" :clearable="false"></v-select>
      <button v-bind:value="sortDir" @click="fireSortDirSelection">{{ sortDir }}</button>
    </div>
  </div>
</template>

<script>
  // import Vue from 'vue'
  import vSelect from 'vue-select'

  export default {
    name: 'ListMenu',
    props: ['type', 'sortDirection', 'sortField'],
    components: {
      'v-select': vSelect
    },
    data () {
      var sortingFields = [
        {
          'label': 'First name',
          'value': 'Supporter_firstName'
        },
        {
          'label': 'Last name',
          'value': 'Supporter_lastName'
        },
        {
          'label': 'Email',
          'value': 'Profile_email'
        },
        {
          'label': 'Active since',
          'value': 'User_created'
        },
        {
          'label': 'Place of residence',
          'value': 'Supporter_placeOfResidence'
        }
      ]

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
      var dir = 'ASC'
      if (this.sortDirection !== null && typeof this.sortDirection !== 'undefined') {
        dir = this.sortDirection
      }

      return {
        'sortDir': dir,
        'typeData': types.filter((t) => t.value === this.type).pop(),
        'types': types,
        'sortingFields': sortingFields,
        'sortData': sortingFields.filter((field) => field.value === this.sortField).pop()
      }
    },
    methods: {
      fireTypeSelection: function () {
        this.$emit('typeSelect', this.typeData.value)
      },
      fireFieldSelection: function () {
        this.$emit('sortFieldSelect', this.sortData.value)
      },
      fireSortDirSelection: function (event) {
        if (event.target.value === 'ASC') {
          this.sortDir = 'DESC'
        } else {
          this.sortDir = 'ASC'
        }
        this.$emit('sortDirSelect', this.sortDir)
      }
    }
  }
</script>

<style scoped>

</style>
