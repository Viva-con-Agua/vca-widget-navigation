<template>
  <div class="navbar navbar-vca navbar-default vca-shadow"> <!-- navbar-default -->
    <div class="container">
      <div class="navbar-header">
        <a class="navbar-brand" href="/">
          <img src="/dispenser/images/drop_small.png"/>
          <div>
            <span class="bold">{{ $vcaI18n.t('header.applicationName') }}</span>
            <span>{{ $vcaI18n.t('header.organizationName') }}</span>
          </div>
        </a>
        <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
          <span class="sr-only">{{ $vcaI18n.t('nav.labels.screenreader.toggle') }}</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <div class="navbar-collapse collapse" id="navbar-main">
        <ul class="nav navbar-nav navbar-right">
          <li v-for="entry in entrys" :key="entry.id" class="vca-button-primary">
            <a v-bind:href="entry.url">{{ $vcaI18n.t('nav.labels.header.' + entry.lable) }}</a>
            <ul class="nav-sub">
              <li v-for="node in entry.entrys" :key="node.id">
                <a v-bind:href="node.url">{{ $vcaI18n.t('nav.labels.header.' + node.lable) }}</a>
              </li>
            </ul>

          </li>
        </ul>
        <ul v-if="errors && errors.length">
          <li v-for="error of errors" :key="error.id">
            {{error.message}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'TopNavigation',
    data () {
      return {
        entrys: [],
        errors: [],
        location: ''
      }
    },
    watch: {
      $route (to, from) {
        this.getNavigation()
      }
    },
    created () {
      window.onhashchange = function(e) {
        this.getNavigation()
      }
    },
    methods: {
      addChild: function () {
        this.entrys.entrys.push({
          name: 'new stuff'
        })
      },
      getNavigation: function () {
        axios.get('/drops/webapp/identity').then(response => {
          if (response.status === 200) {
            axios.get('/dispenser/navigation/get/id').then(r => {
              this.entrys = r.data
            }).catch(e => {
              this.errors.push(e)
            })
          }
        }).catch(error => {
          switch (error.response.status) {
            case 401: axios.get('/dispenser/navigation/get/default').then(response => {
              this.entrys = response.data
            }).catch(e => {
              this.errors.push(e)
            })
          }
        })
      }
    },
    mounted () {
      this.getNavigation()
    }
  }
</script>

<style scoped lang="less">
  @import "./assets/general.less";
  @import "./assets/responsive.less";
  @import "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";

  .navbar-vca {
    .colorProfilePrimary();
    border-radius: 0;
    border: 0;
    /*top: 0;*/
    text-transform: uppercase;
    font-weight: bold;
    padding: 0.5em 0;
    margin-bottom: 2em;

    .navbar-header {
      .navbar-brand {
        color: #colors[secundary];
      }

      .navbar-toggle {
        border-color: #colors[secundary];

        &:focus, &:hover {
          background-color: darken(#colors[primary], 20%);
        }

        .icon-bar {
          background-color: #colors[secundary];
        }

      }
    }

    .navbar-collapse, .navbar-form {
      border: 0;

      .nav {

        & > li {
          margin-right: 0.5em;

          /**
           * Override default bootstrap style
           */
          & > a {
            color: #colors[secundary];
            padding-top: 0.5em;
            padding-bottom: 0.5em;
          }
        }
        .nav-sub {
          display: none;
          position: absolute;
          background-color: lighten(#colors[primary], 20%);
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          z-index: 1;
          list-style: none;
          padding: 0;

          li {
            padding: 0.5em;
            &:hover {
              background-color: #colors[thirdlyHover];
            }
            a {
              text-decoration: none;
              color: #colors[secundary];
            }
          }
        }

        @media @tablet-down {
          margin-top: 0px;
          margin-bottom: 0px;
          padding-top: 0.5em;

          li {
            box-shadow: none;
            -moz-box-shadow: none;
            -webkit-box-shadow: none;
            margin-right: 0;
          }
        }

      }
      .nav li:hover .nav-sub {
        display: block;
      }
    }
  }

  .navbar-brand {
    margin: 0 0.5em 0 0;
    padding: 0px;
    display: flex;
    flex-direction: row;

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;

      span.bold {
        font-size: 1.6em;
      }
    }

    img {
      margin-right: 0.5em;
      font-size: 0.6em;
    }
  }
</style>
