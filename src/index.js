import Vue from 'vue'
import UserWidget from './UserWidget.vue'

export default {
    install(Vue, options) {
        Vue.component('user-widget', UserWidget);
        // window.UserWidget = UserWidget;
    }
}