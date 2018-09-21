<template>
  <div v-if="error() && errorCode === 404" class="user-infos" :class="type">
    <span class="error">Not Found</span>
  </div>
  <div v-else-if="error() && errorCode === 401" class="user-infos" :class="type">
    <span class="error">Not Authenticated</span>
  </div>
  <div v-else-if="error() && errorCode === 403" class="user-infos" :class="type">
    <span class="error">Forbidden</span>
  </div>
  <div v-else-if="defined()" class="user-infos" :class="type">
    <span class="name">{{ user.profiles[0].supporter.fullName }}</span>
    <span v-if="type !== 'small' && showCrew()" class="crew">({{ user.profiles[0].supporter.crew }})</span>
    <span v-else class="crew">(No crew)</span>
  </div>
  <div v-else class="user-infos" :class="type">
    <span class="error">An unknown error occurred</span>
  </div>
</template>

<script>
    export default {
        name: "InfoField",
        props: ['type', 'user', 'errorCode'],
        methods: {
          empty: function () {
            return this.user == null || typeof this.user === "undefined"
          },
          defined: function () {
            return !this.empty()
          },
          showCrew: function () {
            return this.defined() && this.user != null && typeof this.user !== "undefined" &&
              this.user.profiles[0].supporter.hasOwnProperty('crew')
          },
          error: function() {
            return this.errorCode !== null
          }
        }
    }
</script>

<style scoped>
  .small span.name {
    font-size: 0.8em;
    font-style: italic;
  }

  .small span.error {
    font-size: 0.8em;
    font-style: italic;
  }

  .medium span.name {
    font-size: 0.9em;
    font-weight: bold;
  }

  .medium span.error {
    font-size: 0.9em;
  }

  .large span.name {
    font-size: 1.2em;
    font-weight: bolder;
  }

  .large span.error {
    font-size: 1em;
  }

  span.crew {
    font-style: italic;
    font-size: 0.7em;
  }

  div.user-infos {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  div.user-infos.large {
    height: 3em;
  }
</style>
