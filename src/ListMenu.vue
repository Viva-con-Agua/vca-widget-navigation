<template>
  <ul class="listMenu">
    <li class="view">
      <v-select v-model="typeData" @input="fireTypeSelection" :options="types" :clearable="false"></v-select>
    </li>
    <li class="sorting">
      <v-select v-model="sorting.getCurrentField()" @input="fireFieldSelection" :options="sorting.getFields()" :clearable="false"></v-select>
      <button v-bind:value="sorting.sortDir" @click="fireSortDirSelection">
        <div v-if="sorting.is('ASC')" v-html="require('./images/sort-alpha-down.svg')" />
        <div v-if="sorting.is('DESC')" v-html="require('./images/sort-alpha-up.svg')" />
      </button>
    </li>
  </ul>
</template>

<script>
  // import Vue from 'vue'
  import vSelect from 'vue-select'

  export default {
    name: 'ListMenu',
    props: ['type', 'sorting'],
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
        },
        {
          'label': 'Table',
          'value': 'tableRow'
        }
      ]

      return {
        'typeData': types.filter((t) => t.value === this.type).pop(),
        'types': types
      }
    },
    methods: {
      fireTypeSelection: function () {
        this.$emit('typeSelect', this.typeData.value)
      },
      fireFieldSelection: function (event) {
        this.sorting.setField(event.value)
        this.$emit('sortFieldSelect', event.value)
      },
      fireSortDirSelection: function (event) {
        if (event.target.value === 'ASC') {
          this.sorting.setDir('DESC')
        } else {
          this.sorting.setDir('ASC')
        }
        this.$emit('sortDirSelect', this.sorting.sortDir)
      }
    }
  }
</script>

<style scoped>

  .listMenu {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .listMenu li {
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    margin-left: 1em;
  }

  .listMenu li .v-select {
    min-width: 10em;
  }

  .listMenu li button {
    margin-left: 1em;
    background: none;
    border: 1px solid rgba(60, 60, 60, 0.26);
    border-radius: 4px;
  }

  .listMenu li button >>> div {
    pointer-events: none;
  }

  .listMenu li button >>> svg {
    width: 1.5em;
    pointer-events: none;
    cursor: pointer;
  }

</style>
