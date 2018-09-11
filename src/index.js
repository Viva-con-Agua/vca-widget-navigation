import WidgetUser from './WidgetUser.vue'

function plugin (Vue, options) {
  Vue.mixin({
    created: function () {
      if (options != null && typeof options == 'object' && options.hasOwnProperty('uuid')) {
        this.uuid = options.uuid
      }
      if (options != null && typeof options == 'object' && options.hasOwnProperty('type')) {
        this.type = options.type
      }
    }
  })
  Vue.component('widget-user', WidgetUser)
  // Vue.component('hello-jsx', HelloJsx)
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'
// Export all components too
export {
  WidgetUser,
  version
}
