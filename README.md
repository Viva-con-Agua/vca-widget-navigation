# WidgetUser

[![npm](https://img.shields.io/npm/v/widget-user.svg)](https://www.npmjs.com/package/widget-user) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> Implements different visualizations for a user.

## Installation

```bash
npm install --save widget-user
```

## Usage

### Bundler (Webpack, Rollup)

```js
import Vue from 'vue'
import WidgetUser from 'widget-user'
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'widget-user/dist/widget-user.css'

Vue.use(WidgetUser)
```

### Browser

```html
<!-- Include after Vue -->
<!-- Local files -->
<link rel="stylesheet" href="widget-user/dist/widget-user.css"></link>
<script src="widget-user/dist/widget-user.js"></script>

<!-- From CDN -->
<link rel="stylesheet" href="https://unpkg.com/widget-user/dist/widget-user.css"></link>
<script src="https://unpkg.com/widget-user"></script>
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
