<template>
  <tr v-if="type === 'header'" :class="getClass()" class="rowWrapper">
    <th class="image">Avatar</th>
    <th class="name">Name</th>
    <th class="since">Dabei seit</th>
    <th class="crew">Crew</th>
    <th class="email">Email</th>
    <th class="mobilePhone">Handynummer</th>
    <th class="age">Alter</th>
    <th class="gender">Geschlecht</th>
  </tr>
  <tr v-else :class="getClass()" class="rowWrapper content" v-on:click="callLink()">
    <td class="image">
      <Avatar v-bind:error-code="errorState" v-bind:user="user" type="medium"></Avatar>
    </td>
    <td class="name"><a :href="getURL()" ref="profileLink">{{ user.profiles[0].supporter.fullName }}</a></td>
    <td class="since">{{ getSince() }}</td>
    <td class="crew">{{ hasCrew() ? user.profiles[0].supporter.crew : 'Keine Crew' }}</td>
    <td class="email">{{ user.profiles[0].email }}</td>
    <td class="mobilePhone">{{ user.profiles[0].supporter.mobilePhone }}</td>
    <td class="age">{{ getAge() }}</td>
    <td class="gender">{{ user.profiles[0].supporter.sex }}</td>
  </tr>
</template>

<script>
    import Avatar from './Avatar'
    export default {
      name: 'TableRow',
      props: ['className', 'type', 'user', 'errorState'],
      components: {
        'Avatar': Avatar
      },
      methods: {
        getClass: function () {
          return this.type + ' ' + this.className
        },
        hasCrew: function () {
          return this.user != null && typeof this.user !== 'undefined' &&
            this.user.profiles[0].supporter.hasOwnProperty('crew')
        },
        getAge: function () {
          var birthday = new Date(this.user.profiles[0].supporter.birthday)
          var ageDifMs = Date.now() - birthday.getTime()
          var ageDate = new Date(ageDifMs) // miliseconds from epoch
          return Math.abs(ageDate.getUTCFullYear() - 1970)
        },
        getSince: function () {
          var created = new Date(this.user.created)
          return created.getUTCFullYear()
        },
        getURL: function () {
          return '/arise/#/profile/' + this.user.id
        },
        callLink: function () {
          this.$refs.profileLink.click()
        }
      }
    }
</script>

<style scoped lang="less">
  @import "./assets/general.less";

  .rowWrapper {
    height: 2em;
    padding: 1em 0;

    &.content {
      .colorProfileSecundary();
      cursor: pointer;

      &:hover {
        box-shadow: #shadow[secundary];
      }
    }

    &.odd {
      background-color: fadeout(#colors[primary], 80%);
    }

    th {
      .colorProfilePrimary();
      font-weight: bold;
    }
  }

  .image {
    width: 4em;
  }
</style>
