import Vue from 'vue'
import UserWidget from './UserWidget.vue'

export default {
    install(Vue, options) {
        Vue.mixin({
            created: function () {
                if(options.hasOwnProperty("uuid")) {
                    this.uuid = options.uuid;
                }
                if(options.hasOwnProperty("type")) {
                    this.type = options.type;
                }
            }
        })
        Vue.component('user-widget', UserWidget);
        // window.UserWidget = UserWidget;
    }
}