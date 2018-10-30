# WidgetUser

[![npm](https://img.shields.io/npm/v/vca-widget-user.svg)](https://www.npmjs.com/package/vca-widget-user) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> Implements different visualizations for a user.

## Preconditions
Using this package requires a running version of [Drops](https://github.com/Viva-con-Agua/drops), that has already 
implemented [issue #225](https://github.com/Viva-con-Agua/drops/issues/225). Additionally, the web server has to use the 
same domain and the same port to take requests for [Drops](https://github.com/Viva-con-Agua/drops) (using the path prefix 
`/drops/`) and the front end application you want to use this plugin for.

## Installation

```bash
npm install --save vca-widget-user
```

## Usage

### Bundler (Webpack, Rollup)

```js
import Vue from 'vue'
import WidgetUserList from 'vca-widget-user'
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'vca-widget-user/dist/vca-widget-user.css'

Vue.use(WidgetUserList)

export default {
  name: 'App',
  components: { WidgetUserList },
  data () {
    return { options: {
      'type': { 'menue': true, 'value': 'table' },
      'sorting': { 'menue': { 'field': 'Supporter_firstName', 'dir': 'ASC' } },
      'lang': 'de'
    } }
  }
}

```

Inside your template:
```xml
<template>
  <div id="app">
    <WidgetUserList :options="options" />
  </div>
</template>
```

#### Existing internationalization
If you already use [vue-i18n](https://www.npmjs.com/package/vue-i18n) to handle your internationalization and localization, we have to merge our messages into 
yours. You can do this in your `main.js` before you instantiate your Vue App.

```js
import Vue from 'vue';
...
import VueI18n from 'vue-i18n';
import WidgetUserList from 'vca-widget-user' // use `WidgetUser` if you don't need a list of users

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: locale,
    messages: {
        'en-US': require('@/lang/en_US'),
        'de-DE': require('@/lang/de_VCA'),
        'ja-JA': require('../node_modules/element-ui/lib/locale/lang/ja')
    }
});

// the most important line of code here
Vue.use(WidgetUserList, { 'i18n': i18n })

/* eslint-disable no-new */

new Vue({
  ...
  i18n,
  components: { WidgetUserList },
  ...
}).$mount('#app');
```
Afterwards, you don't have to use `Vue.use(WidgetUserList)` in your components again.

### Browser

```html
<!-- Include after Vue -->
<!-- Local files -->
<link rel="stylesheet" href="widget-user/dist/widget-user.css"></link>
<script src="vca-widget-user/dist/widget-user.js"></script>

<!-- From CDN -->
<link rel="stylesheet" href="https://unpkg.com/vca-widget-user/dist/widget-user.css"></link>
<script src="https://unpkg.com/vca-widget-user"></script>
```

## Development

### Launch visual tests

```bash
npm run dev
```

### Launch Karma with coverage

```bash
npm run dev:coverage
```

### Build

Bundle the js and css of to the `dist` folder:

```bash
npm run build
```


## Publishing

The `prepublish` hook will ensure dist files are created before publishing. This
way you don't need to commit them in your repository.

```bash
# Bump the version first
# It'll also commit it and create a tag
npm version
# Push the bumped package and tags
git push --follow-tags
# Ship it 🚀
npm publish
```

## License

[MIT](http://opensource.org/licenses/MIT)
