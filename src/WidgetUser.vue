<template>
  <div v-if="defined">
    <img v-if="showImg" :src="user.avatar" alt="Missing image" />
    <span :class="typeData">{{ user.firstname }} {{this.user.lastname }}</span>
  </div>
  <div v-else>
    <span :class="typeData">There is currently no user logged in!</span>
  </div>
</template>

<script>
  export default {
    name: 'UserWidget',
    props: ['uuid', 'type'],
    data () {
      return {
        showImg: (this.type === 'medium' || this.type === 'large'),
        user: null,
        uuidData: this.uuid,
        typeData: this.type
      }
    },
    methods: {
      init: function () {
        if(this.uuidData == null) {
          this.uuidData = Vue.$widgetUserDefaultUUID
        }
        if(this.typeData == null) {
          this.typeData = Vue.$widgetUserDefaultType
        }
        var that = this
        this.axios
          .get('http://localhost/drops/widgets/user/' + this.uuidData)
          .then(function (response) {
            switch (response.status) {
              case 200:
                that.user = response.additional_information
                break
            }
          }).catch(function (error) {
            switch (error.response.status) {
              case 404:
              // Todo: How to handle error messages?
              // that.open(that.$t('signin.error'), error.response.data.msg, "error");
                break
            }
          })
      },
      empty: function() {
        return this.user == null
      },
      defined: function() {
        return !this.empty();
      }
    }
  }
</script>

<style scoped>

  span.small {
    font-size: 0.5em;
    font-style: italic;
  }

  span.medium {
    font-size: 0.9em;
    font-weight: bold;
  }

  span.large {
    font-size: 1.2em;
    font-weight: bolder;
  }
</style>
