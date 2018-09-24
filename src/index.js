import WidgetUser from './WidgetUser.vue'

function plugin (Vue, options) {
  if (options != null && typeof options === 'object' && options.hasOwnProperty('uuid')) {
    Vue.prototype.$widgetUserDefaultUUID = options.uuid
  } else {
    Vue.prototype.$widgetUserDefaultUUID = null
  }
  if (options != null && typeof options === 'object' && options.hasOwnProperty('type')) {
    Vue.prototype.$widgetUserDefaultType = options.type
  } else {
    Vue.prototype.$widgetUserDefaultType = null
  }
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
